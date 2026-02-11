import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">About Our School</h1>
        <p className="text-lg text-muted-foreground">
          Raghunathganj Sarada Bidyapith is dedicated to providing quality education and fostering holistic development in young learners.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Target className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide a nurturing environment where students can develop academically, socially, and emotionally, preparing them for future success and responsible citizenship.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be a leading educational institution that inspires excellence, creativity, and lifelong learning in every student, empowering them to make positive contributions to society.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Award className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Striving for the highest standards in education and character development.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Compassion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fostering empathy, kindness, and respect for all members of our community.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Encouraging curiosity, critical thinking, and a love for lifelong learning.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Building character through honesty, responsibility, and ethical behavior.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/30 rounded-lg p-8 space-y-4">
        <h2 className="text-3xl font-bold">Our History</h2>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            Raghunathganj Sarada Bidyapith has been serving the community for many years, providing quality upper primary education to students in the region. Our school has grown from humble beginnings to become a respected institution known for academic excellence and character development.
          </p>
          <p>
            Throughout our history, we have remained committed to our founding principles of providing accessible, quality education to all students. Our dedicated faculty and staff work tirelessly to create a supportive learning environment where every child can thrive.
          </p>
          <p>
            Today, we continue to evolve and adapt to meet the changing needs of our students and community, while staying true to our core values and mission.
          </p>
        </div>
      </section>
    </div>
  );
}
