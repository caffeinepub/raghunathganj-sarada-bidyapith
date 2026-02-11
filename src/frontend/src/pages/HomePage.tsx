import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePublishedAnnouncements, usePublishedEvents, usePublishedStaff, usePublishedGallery } from '../hooks/usePublicContent';
import LoadingSection from '../components/state/LoadingSection';
import { Calendar, Users, Image as ImageIcon, Bell, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { data: announcements, isLoading: announcementsLoading } = usePublishedAnnouncements();
  const { data: events, isLoading: eventsLoading } = usePublishedEvents();
  const { data: staff, isLoading: staffLoading } = usePublishedStaff();
  const { data: gallery, isLoading: galleryLoading } = usePublishedGallery();

  const recentAnnouncements = announcements?.slice(0, 3) || [];
  const upcomingEvents = events?.slice(0, 3) || [];
  const featuredStaff = staff?.slice(0, 4) || [];
  const recentGallery = gallery?.slice(0, 4) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to<br />
                <span className="text-primary">Raghunathganj Sarada Bidyapith</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Nurturing young minds with quality education, strong values, and a commitment to excellence in learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/admissions">Admissions Open</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1600x600.png"
                alt="School Campus"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Bell className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Stay updated with latest news and notices</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Upcoming school events and activities</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Our Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Dedicated and experienced educators</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <ImageIcon className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Moments from school life</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recent Announcements</h2>
            <Button asChild variant="ghost">
              <Link to="/announcements">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {announcementsLoading ? (
            <LoadingSection count={3} />
          ) : recentAnnouncements.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recentAnnouncements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{announcement.title}</CardTitle>
                    <CardDescription>
                      {new Date(Number(announcement.timestamp) / 1000000).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{announcement.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No announcements at this time.</p>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Button asChild variant="ghost">
            <Link to="/events">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {eventsLoading ? (
          <LoadingSection count={3} />
        ) : upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription>
                    {new Date(Number(event.date) / 1000000).toLocaleDateString()} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No upcoming events scheduled.</p>
        )}
      </section>

      {/* Staff Preview */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Meet Our Staff</h2>
            <Button asChild variant="ghost">
              <Link to="/staff">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {staffLoading ? (
            <LoadingSection count={4} />
          ) : featuredStaff.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStaff.map((member) => (
                <Card key={member.id} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <Users className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Staff information coming soon.</p>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Gallery</h2>
          <Button asChild variant="ghost">
            <Link to="/gallery">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {galleryLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentGallery.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGallery.map(([id, blob]) => (
              <div key={id} className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={blob.getDirectURL()}
                  alt="Gallery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Gallery images coming soon.</p>
        )}
      </section>
    </div>
  );
}
