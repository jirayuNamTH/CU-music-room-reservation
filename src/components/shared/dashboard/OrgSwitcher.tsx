import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building, CheckCircle, ChevronDown, Plus, PlusCircle } from "lucide-react"
import { Organization, OrgSwitcherItem } from "@/lib/shared"

interface OrgSwitcherProps {
  orgs: OrgSwitcherItem[];
  currentOrg: Organization;
}

function OrgSwitcher({ orgs, currentOrg }: OrgSwitcherProps) {
  // In a real app, you'd use <Link> or router.push() for navigation
  const handleOrgChange = (orgId: string) => {
    // router.push(`/admin/${orgId}/dashboard`);
    alert(`Switching to org ${orgId}`);
  };

  const handleAddOrg = () => {
    // router.push('/admin/create-organization');
    alert('Going to create new org page');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2 truncate">
            <Building className="h-4 w-4" />
            <span className="truncate font-semibold">{currentOrg.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {orgs.map((org) => (
          <DropdownMenuItem key={org.orgId} onSelect={() => handleOrgChange(org.orgId)}>
            {org.name}
            {org.orgId === currentOrg._id && <CheckCircle className="h-4 w-4 ml-auto text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleAddOrg}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrgSwitcher;