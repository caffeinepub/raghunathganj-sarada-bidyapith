import React from 'react';
import { usePublishedStaff } from '../hooks/usePublicContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LoadingSection from '../components/state/LoadingSection';
import ErrorSection from '../components/state/ErrorSection';
import { Users, Mail } from 'lucide-react';

export default function StaffPage() {
  const { data: staff, isLoading, isError } = usePublishedStaff();

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
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <Users className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Our Staff</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Meet our dedicated team of educators committed to nurturing young minds and fostering excellence.
        </p>
      </section>

      {isLoading ? (
        <LoadingSection count={6} />
      ) : isError ? (
        <ErrorSection />
      ) : staff && staff.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id} className="text-center">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-base font-medium text-primary">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.bio && (
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                )}
                {member.contact && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.contact}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Staff Information</h3>
          <p className="text-muted-foreground">Staff information will be available soon.</p>
        </div>
      )}
    </div>
  );
}
