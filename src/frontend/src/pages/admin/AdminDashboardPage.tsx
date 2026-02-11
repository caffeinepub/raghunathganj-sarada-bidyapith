import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Users, Image, Settings } from 'lucide-react';

export default function AdminDashboardPage() {
  const adminSections = [
    {
      title: 'Announcements',
      description: 'Manage school announcements and notices',
      icon: Bell,
      to: '/admin/announcements',
    },
    {
      title: 'Events',
      description: 'Create and manage school events',
      icon: Calendar,
      to: '/admin/events',
    },
    {
      title: 'Staff',
      description: 'Manage staff profiles and information',
      icon: Users,
      to: '/admin/staff',
    },
    {
      title: 'Gallery',
      description: 'Upload and manage gallery images',
      icon: Image,
      to: '/admin/gallery',
    },
    {
      title: 'Site Settings',
      description: 'Update contact information and settings',
      icon: Settings,
      to: '/admin/settings',
    },
  ];

  return (
    <div className="container py-12 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your school website content and settings.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Card key={section.to} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <section.icon className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={section.to}>Manage</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
