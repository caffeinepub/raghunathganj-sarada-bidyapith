import React from 'react';
import { useSiteSettings } from '../hooks/usePublicContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '../components/forms/ContactForm';
import LoadingSection from '../components/state/LoadingSection';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const { data: settings, isLoading } = useSiteSettings();

  const getSettingValue = (key: string) => {
    return settings?.find((s) => s.key === key)?.value || '';
  };

  const address = getSettingValue('address');
  const phone = getSettingValue('phone');
  const email = getSettingValue('email');
  const officeHours = getSettingValue('officeHours');

  return (
    <div className="container py-12 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with us for admissions, inquiries, or any other information.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Get In Touch</h2>
          {isLoading ? (
            <LoadingSection count={4} />
          ) : (
            <div className="space-y-4">
              {address && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{address}</p>
                  </CardContent>
                </Card>
              )}

              {phone && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{phone}</p>
                  </CardContent>
                </Card>
              )}

              {email && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{email}</p>
                  </CardContent>
                </Card>
              )}

              {officeHours && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{officeHours}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <Card>
            <CardContent className="pt-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
