import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../../hooks/usePublicContent';
import { useSaveSetting } from '../../hooks/useAdminContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import LoadingSection from '../../components/state/LoadingSection';
import ErrorSection from '../../components/state/ErrorSection';
import { Save, Loader2 } from 'lucide-react';
import type { Setting } from '../../backend';

export default function AdminSettingsPage() {
  const { data: settings, isLoading, isError } = useSiteSettings();
  const saveMutation = useSaveSetting();

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    officeHours: '',
  });

  useEffect(() => {
    if (settings) {
      const getSettingValue = (key: string) => {
        return settings.find((s) => s.key === key)?.value || '';
      };

      setFormData({
        address: getSettingValue('address'),
        phone: getSettingValue('phone'),
        email: getSettingValue('email'),
        officeHours: getSettingValue('officeHours'),
      });
    }
  }, [settings]);

  const handleSave = async (key: string, value: string) => {
    const setting: Setting = {
      id: key,
      key,
      value,
    };
    await saveMutation.mutateAsync(setting);
  };

  const handleSaveAll = async () => {
    for (const [key, value] of Object.entries(formData)) {
      await handleSave(key, value);
    }
  };

  return (
    <div className="container py-12 space-y-8 max-w-3xl">
      <div>
        <h1 className="text-4xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-2">Update school contact information and settings</p>
      </div>

      {isLoading ? (
        <LoadingSection count={4} />
      ) : isError ? (
        <ErrorSection />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              This information will be displayed on the contact page and footer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">School Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter school address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeHours">Office Hours</Label>
              <Textarea
                id="officeHours"
                value={formData.officeHours}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                placeholder="e.g., Monday - Friday: 9:00 AM - 4:00 PM"
                rows={3}
              />
            </div>

            <Button onClick={handleSaveAll} disabled={saveMutation.isPending} className="w-full">
              {saveMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Settings
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
