import React from 'react';
import { usePublishedAnnouncements } from '../hooks/usePublicContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSection from '../components/state/LoadingSection';
import ErrorSection from '../components/state/ErrorSection';
import { Bell } from 'lucide-react';

export default function AnnouncementsPage() {
  const { data: announcements, isLoading, isError } = usePublishedAnnouncements();

  return (
    <div className="container py-12 space-y-8">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <Bell className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Announcements</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Stay informed with the latest news, notices, and updates from our school.
        </p>
      </section>

      {isLoading ? (
        <LoadingSection count={5} />
      ) : isError ? (
        <ErrorSection />
      ) : announcements && announcements.length > 0 ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-2xl">{announcement.title}</CardTitle>
                    <CardDescription>
                      Posted on {new Date(Number(announcement.timestamp) / 1000000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {announcement.author && ` • By ${announcement.author}`}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{announcement.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Announcements</h3>
          <p className="text-muted-foreground">There are no announcements at this time. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
