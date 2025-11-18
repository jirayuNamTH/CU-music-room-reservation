import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageIcon, Mail, Phone, Globe, Plus, Trash2, PlusCircle } from "lucide-react";
import { Contact } from '@/lib/shared';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function SettingsView({ isOwner }: { isOwner: boolean }) {
  // Mock data - replace with API call
  const contacts: Contact[] = [
    { id: 'c1', type: 'email', value: 'contact@acme.com', icon: Mail },
    { id: 'c2', type: 'phone', value: '+1 (555) 123-4567', icon: Phone },
    { id: 'c3', type: 'website', value: 'acme.com', icon: Globe },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Organization Settings</h1>
      
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This information will be displayed on your public booking page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" defaultValue="Acme Music Club" disabled={!isOwner} />
          </div>
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/64x64/6366f1/e0e7ff?text=A" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              {isOwner && <Button variant="outline" size="sm">Change Picture</Button>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-desc">Description (Rich Text)</Label>
            <div className="h-48 w-full rounded-md border bg-muted p-3">
              [Rich Text Editor placeholder for Chrome, Edge, Firefox, Safari]
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact List */}
      <Card>
        <CardHeader>
          <CardTitle>Contact List</CardTitle>
          <CardDescription>Add contact methods for your clients.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contacts.map(contact => (
            <div key={contact.id} className="flex gap-2">
              <Select defaultValue={contact.type} disabled={!isOwner}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email"><Mail className="h-4 w-4 inline-block mr-2" />Email</SelectItem>
                  <SelectItem value="phone"><Phone className="h-4 w-4 inline-block mr-2" />Phone</SelectItem>
                  <SelectItem value="website"><Globe className="h-4 w-4 inline-block mr-2" />Website</SelectItem>
                  {/* Add IG, Facebook, etc. here */}
                </SelectContent>
              </Select>
              <Input defaultValue={contact.value} className="flex-1" disabled={!isOwner} />
              {isOwner && <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
          {isOwner && (
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Contact
            </Button>
          )}
        </CardContent>
      </Card>
      
      {/* Danger Zone */}
      {isOwner && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Delete this organization</p>
              <p className="text-sm text-muted-foreground">This action cannot be undone and will delete all data.</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Organization</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete <span className="font-bold">Acme Music Club</span> and all of its data, including rooms and bookings. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                  <Button variant="destructive">Yes, delete this organization</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SettingsView;