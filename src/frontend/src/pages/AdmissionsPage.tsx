import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, FileText, Calendar, Users } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">Admissions</h1>
        <p className="text-lg text-muted-foreground">
          We welcome applications from students seeking quality upper primary education in a nurturing environment.
        </p>
      </section>

      <Alert className="bg-primary/10 border-primary">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary">
          Admissions are now open for the upcoming academic year. Contact us for more information.
        </AlertDescription>
      </Alert>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Eligibility Criteria</h2>
        <Card>
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Age Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              Students must meet the age requirements as per state education board guidelines for upper primary classes (Classes V to VIII).
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Class V: 10 years as of June 1st</li>
              <li>Class VI: 11 years as of June 1st</li>
              <li>Class VII: 12 years as of June 1st</li>
              <li>Class VIII: 13 years as of June 1st</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Required Documents</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>For New Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Birth certificate (original and photocopy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Transfer certificate from previous school</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Previous year's report card</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Passport-size photographs (4 copies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Address proof (Aadhaar card/Voter ID)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Caste certificate (if applicable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Income certificate (for fee concessions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Medical fitness certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Parent/Guardian ID proof</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Admission Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                1
              </div>
              <CardTitle className="text-lg">Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Collect and submit the admission form with required documents
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                2
              </div>
              <CardTitle className="text-lg">Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Document verification and eligibility check by school administration
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                3
              </div>
              <CardTitle className="text-lg">Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interaction with student and parents to understand needs and expectations
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                4
              </div>
              <CardTitle className="text-lg">Confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Admission confirmation and fee payment to secure the seat
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/30 rounded-lg p-8 space-y-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-8 w-8 text-primary" />
          Important Dates
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Admission Form Availability</span>
            <span className="text-muted-foreground">January - March</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Last Date for Submission</span>
            <span className="text-muted-foreground">March 31st</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Document Verification</span>
            <span className="text-muted-foreground">April 1st - 15th</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium">Admission Confirmation</span>
            <span className="text-muted-foreground">April 20th - 30th</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Academic Session Begins</span>
            <span className="text-muted-foreground">May 1st</span>
          </div>
        </div>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Need More Information?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          For detailed information about the admission process, fee structure, or any other queries, please visit our office during working hours or contact us through the contact page.
        </p>
      </section>
    </div>
  );
}
