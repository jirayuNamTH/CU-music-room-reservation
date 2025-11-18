"use client";

import React, { useMemo, useState } from 'react';
import Workspace from '@/app/dashboard/component/WorkspaceView';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Organization, OrgRole, OrgSwitcherItem, User } from '@/lib/shared';
import DashboardSidebar from '@/app/dashboard/component/DashboardSidebar';
import WorkspaceView from '@/app/dashboard/component/WorkspaceView';
import { useEffect } from 'react';

export default function AdminDashboardPage() {

    const useAuth = (): { user: User | null, isLoading: boolean } => {
    const user: User = { 
        _id: 'user_123', 
        googleId: 'google_123',
        email: 'owner@example.com',
        name: 'Alisa Owner',
        role: 'user', // Global role is just 'user'
        organizations: ['org_acme', 'org_beta'], // Belongs to two orgs
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return { user, isLoading: false };
    };
    const useParams = (): { orgId: string } => ({ orgId: 'org_acme' });
    const useRouter = () => ({
    push: (path: string) => alert(`MOCK REDIRECT: -> ${path}`),
    replace: (path: string) => alert(`MOCK REDIRECT (REPLACE): -> ${path}`),
    });

    // Mock database
    const mockOrgs: Organization[] = [
    {
        _id: 'org_acme',
        name: 'Acme Music Club',
        description: 'The best music club in town. We provide top-tier rooms.',
        createdBy: 'user_123',
        members: [
        { userId: 'user_123', role: 'admin' },
        { userId: 'user_456', role: 'staff' },
        { userId: 'user_789', role: 'staff' },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 'org_beta',
        name: 'Beta Sound Hub',
        description: 'A community-driven sound hub.',
        createdBy: 'user_999',
        members: [
        { userId: 'user_123', role: 'staff' },
        { userId: 'user_999', role: 'admin' },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    ];

    const fetcher = async (url: string): Promise<{ organization: Organization | null; userRole: OrgRole | null }> => {
    console.log(`SWR Mock Fetch: ${url}`);
    const orgId = url.split('/').pop();
    const org = mockOrgs.find(o => o._id === orgId) || null;
    
    if (org) {
        const member = org.members.find(m => m.userId === 'user_123');
        return {
        organization: org,
        userRole: member ? member.role : null
        };
    }
    return { organization: null, userRole: null };
    };

    const useSWR = (key: string | null, fetcher: (url: string) => Promise<any>): { data: any, error: any, isLoading: boolean } => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (key) {
        fetcher(key).then(res => {
            setData(res);
            setIsLoading(false);
        });
        } else {
        setIsLoading(false);
        }
    }, [key]);
    return { data, error: null, isLoading };
    };
    // --- END MOCK HOOKS ---

    // Your API URL from .env
    // Safely access process.env to avoid ReferenceError in non-Next.js/Node envs
    const API_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) 
                    ? process.env.NEXT_PUBLIC_API_URL 
                    : '/api';

    const [activeView, setActiveView] = useState('bookings');
    
    // 1. --- REAL AUTH & ROUTING HOOKS ---
    const { user, isLoading: isUserLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const orgIdFromUrl = Array.isArray(params.orgId) ? params.orgId[0] : params.orgId;
    // ---------------------------------

    // 2. --- CORE LOGIC: Handle redirection and org creation ---
    useEffect(() => {
        if (isUserLoading) {
        return; // Wait for user data
        }

        if (!user) {
        router.replace('/'); // Not logged in, send to homepage
        return;
        }

        const userOrgs = user.organizations || [];

        if (userOrgs.length > 0) {
        // --- Case 1: User has organizations ---
        const firstOrgId = userOrgs[0];
        if (!orgIdFromUrl) {
            // If URL has no orgId, redirect to their first one.
            router.replace(`/admin/${firstOrgId}/dashboard`);
        }
        // If orgIdFromUrl *is* present, we let SWR fetch it.
        // A real app would also check if user is a member, but our API mock does this.
        
        } else if (userOrgs.length === 0 && !orgIdFromUrl) {
        // --- Case 2: User has NO orgs and is not already on an org page ---
        // We must create one for them.
        handleCreateDefaultOrg();
        }
    }, [user, isUserLoading, orgIdFromUrl, router]);

    // 3. --- API Call: Create default org ---
    const handleCreateDefaultOrg = async () => {
        try {
        // This requires a new API endpoint on your backend
        const res = await fetch(`${API_URL}/organizations/create-default`, { 
            method: 'POST' 
            // Your API will get user ID from the cookie
        });
        if (!res.ok) throw new Error('Failed to create organization');
        
        const newOrg: Organization = await res.json(); // Backend returns the new Organization
        
        // Now, redirect user to their new org's dashboard
        router.replace(`/admin/${newOrg._id}/dashboard`);

        } catch (err) {
        console.error(err);
        // Handle error (e.g., show a toast, redirect to an error page)
        alert('Could not create your organization. Please try again.');
        router.push('/');
        }
    };

    // 4. --- DATA FETCHING: Get current org details and user's role ---
    const { data: orgData, isLoading: isOrgLoading } = useSWR(
        orgIdFromUrl ? `${API_URL}/organizations/${orgIdFromUrl}` : null, // Only fetch if orgId is in URL
        fetcher // Assumes fetcher is defined (e.g., in AuthContext or here)
    );

    const isLoading = isUserLoading || isOrgLoading;

    // 5. --- DERIVED STATE: Get org and role from fetched data ---
    const currentOrg: Organization | null = useMemo(() => orgData?.organization, [orgData]);
    const userRole: OrgRole | null = useMemo(() => orgData?.userRole, [orgData]);
    
    // Your `libs/share.ts` uses 'admin' for the owner role.
    const isOwner = userRole === 'admin';

    // --- RENDER STATES ---
    if (isLoading || !currentOrg || !user) {
        return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-lg">Loading Your Dashboard...</div>
        </div>
        );
    }
    
    // At this point, user is logged in, and we have a valid org
    
    // Mock org list for switcher
    const userOrgList: OrgSwitcherItem[] = user.organizations.map(id => {
        const org = mockOrgs.find(o => o._id === id);
        return { orgId: id, name: org ? org.name : 'Loading...' };
    });
    
    return (
        <div className="flex h-screen bg-muted/40">
        {/* 1. SIDEBAR */}
        <DashboardSidebar
            orgs={userOrgList} 
            currentOrg={currentOrg}
            activeView={activeView}
            onSelectView={setActiveView}
            isOwner={isOwner}
        />
        
        {/* 2. WORKSPACE */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <WorkspaceView activeView={activeView} isOwner={isOwner} />
            </div>
        </main>
        </div>
    );
}