import React, { useState } from 'react';
import { useAllStaff, useSaveStaffProfile, useDeleteStaffProfile } from '../../hooks/useAdminContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LoadingSection from '../../components/state/LoadingSection';
import ErrorSection from '../../components/state/ErrorSection';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import type { StaffProfile } from '../../backend';

export default function AdminStaffPage() {
  const { data: staff, isLoading, isError } = useAllStaff();
  const saveMutation = useSaveStaffProfile();
  const deleteMutation = useDeleteStaffProfile();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    contact: '',
    published: true,
  });

  const handleEdit = (profile: StaffProfile) => {
    setEditingStaff(profile);
    setFormData({
      name: profile.name,
      position: profile.position,
      bio: profile.bio,
      contact: profile.contact,
      published: profile.published,
    });
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      position: '',
      bio: '',
      contact: '',
      published: true,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const profile: StaffProfile = {
      id: editingStaff?.id || `staff-${Date.now()}`,
      name: formData.name,
      position: formData.position,
      bio: formData.bio,
      contact: formData.contact,
      published: formData.published,
      photoId: editingStaff?.photoId,
    };

    await saveMutation.mutateAsync(profile);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this staff profile?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Staff</h1>
          <p className="text-muted-foreground mt-2">Create and manage staff profiles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>
              <Plus className="mr-2 h-4 w-4" />
              New Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Staff Profile' : 'New Staff Profile'}</DialogTitle>
              <DialogDescription>
                {editingStaff ? 'Update the staff profile details' : 'Create a new staff profile'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Mathematics Teacher"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Email or phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief biography"
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.position || saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingSection count={5} />
      ) : isError ? (
        <ErrorSection />
      ) : staff && staff.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                      <CardDescription className="truncate">{member.position}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={member.published ? 'default' : 'secondary'} className="ml-2">
                    {member.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                )}
                {member.contact && (
                  <p className="text-sm text-muted-foreground">{member.contact}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No staff profiles yet. Create your first staff profile.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
