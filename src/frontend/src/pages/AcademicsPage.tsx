import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, GraduationCap, Library } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">Academics</h1>
        <p className="text-lg text-muted-foreground">
          Our comprehensive curriculum is designed to provide a strong foundation in core subjects while nurturing creativity and critical thinking.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardHeader>
            <BookOpen className="h-10 w-10 mx-auto text-primary mb-2" />
            <CardTitle>Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive syllabus covering all essential subjects for upper primary education.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <GraduationCap className="h-10 w-10 mx-auto text-primary mb-2" />
            <CardTitle>Qualified Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Experienced and dedicated educators committed to student success.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Library className="h-10 w-10 mx-auto text-primary mb-2" />
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Well-equipped classrooms and library facilities for enhanced learning.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Clock className="h-10 w-10 mx-auto text-primary mb-2" />
            <CardTitle>School Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monday to Friday, 9:00 AM to 3:30 PM with structured learning periods.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Subjects Offered</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Bengali Language',
            'English Language',
            'Mathematics',
            'Science',
            'Social Studies',
            'Environmental Studies',
            'Physical Education',
            'Arts & Crafts',
            'Music',
          ].map((subject) => (
            <Card key={subject}>
              <CardContent className="p-4">
                <p className="font-medium">{subject}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 rounded-lg p-8 space-y-4">
        <h2 className="text-3xl font-bold">Our Approach to Learning</h2>
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            At Raghunathganj Sarada Bidyapith, we believe in a student-centered approach to education. Our teaching methods combine traditional instruction with interactive learning activities to engage students and promote deep understanding.
          </p>
          <p>
            We emphasize the development of critical thinking skills, creativity, and problem-solving abilities. Our curriculum is designed to meet state educational standards while providing opportunities for students to explore their interests and talents.
          </p>
          <p>
            Regular assessments and parent-teacher communication ensure that each student receives the support they need to succeed academically and personally.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Facilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Classrooms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Spacious, well-lit classrooms equipped with modern teaching aids and comfortable seating arrangements to facilitate effective learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A well-stocked library with a diverse collection of books, reference materials, and reading resources to encourage a love for reading.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Playground</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Safe and spacious outdoor play area where students can engage in physical activities and sports during breaks and PE classes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Science Lab</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Basic science laboratory facilities for hands-on experiments and practical learning in science subjects.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
