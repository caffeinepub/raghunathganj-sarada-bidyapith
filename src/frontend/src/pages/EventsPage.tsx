import React from 'react';
import { usePublishedEvents } from '../hooks/usePublicContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSection from '../components/state/LoadingSection';
import ErrorSection from '../components/state/ErrorSection';
import { Calendar, MapPin } from 'lucide-react';

export default function EventsPage() {
  const { data: events, isLoading, isError } = usePublishedEvents();

  const formatEventDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isUpcoming = (timestamp: bigint) => {
    const eventDate = new Date(Number(timestamp) / 1000000);
    return eventDate >= new Date();
  };

  return (
    <div className="container py-12 space-y-8">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Events</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Discover upcoming school events, activities, and important dates.
        </p>
      </section>

      {isLoading ? (
        <LoadingSection count={5} />
      ) : isError ? (
        <ErrorSection />
      ) : events && events.length > 0 ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event) => (
            <Card key={event.id} className={isUpcoming(event.date) ? 'border-primary/50' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatEventDate(event.date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  {isUpcoming(event.date) && (
                    <Badge className="bg-primary">Upcoming</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Events Scheduled</h3>
          <p className="text-muted-foreground">There are no events scheduled at this time. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
