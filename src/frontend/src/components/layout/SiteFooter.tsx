import React from 'react';
import { Link } from '@tanstack/react-router';
import { useSiteSettings } from '../../hooks/usePublicContent';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const { data: settings } = useSiteSettings();

  const getSettingValue = (key: string) => {
    return settings?.find((s) => s.key === key)?.value || '';
  };

  const address = getSettingValue('address');
  const phone = getSettingValue('phone');
  const email = getSettingValue('email');

  const appIdentifier = encodeURIComponent(window.location.hostname || 'school-website');

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">Raghunathganj Sarada Bidyapith</h3>
            <p className="text-sm text-muted-foreground">
              An upper primary school committed to excellence in education.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/academics" className="text-muted-foreground hover:text-foreground transition-colors">
                Academics
              </Link>
              <Link to="/admissions" className="text-muted-foreground hover:text-foreground transition-colors">
                Admissions
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              {address && <p>{address}</p>}
              {phone && <p>Phone: {phone}</p>}
              {email && <p>Email: {email}</p>}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Raghunathganj Sarada Bidyapith. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
