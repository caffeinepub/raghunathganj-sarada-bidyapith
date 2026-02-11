import React, { useState } from 'react';
import { useAdminStatus } from '../../hooks/useAdminStatus';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCallerPrincipalText } from '../../hooks/useCallerPrincipalText';
import { useFirstAdminBootstrapAvailable, useBootstrapFirstAdmin } from '../../hooks/useFirstAdminBootstrap';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Loader2, Copy, Check, UserCog } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();
  const { principalText, isLoading: principalLoading } = useCallerPrincipalText();
  const { isAvailable: bootstrapAvailable, isLoading: bootstrapCheckLoading } = useFirstAdminBootstrapAvailable();
  const bootstrapMutation = useBootstrapFirstAdmin();
  const navigate = useNavigate();
  
  const [copied, setCopied] = useState(false);

  const handleCopyPrincipal = async () => {
    try {
      await navigator.clipboard.writeText(principalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy principal:', error);
    }
  };

  const handleBootstrap = async () => {
    try {
      await bootstrapMutation.mutateAsync();
      // After successful bootstrap, the admin status will be invalidated and re-fetched
    } catch (error) {
      console.error('Bootstrap error:', error);
    }
  };

  if (adminLoading || isLoggingIn || principalLoading || bootstrapCheckLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>You must be logged in to access the admin area.</p>
            <Button onClick={login}>Login to Continue</Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>You do not have permission to access the admin area. Only allowlisted administrators can manage site content.</p>
            
            {/* Display principal */}
            <div className="bg-muted/50 rounded-md p-3 space-y-2">
              <p className="text-sm font-medium">Your Internet Identity Principal:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-background px-2 py-1 rounded border break-all">
                  {principalText}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPrincipal}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Bootstrap CTA if available */}
            {bootstrapAvailable && (
              <div className="bg-primary/10 border border-primary/20 rounded-md p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <UserCog className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-medium">First-Time Setup Available</p>
                    <p className="text-sm text-muted-foreground">
                      No administrators have been configured yet. You can become the first admin to manage this site.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleBootstrap}
                  disabled={bootstrapMutation.isPending}
                  className="w-full"
                >
                  {bootstrapMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <UserCog className="h-4 w-4 mr-2" />
                      Become Admin (First-Time Setup)
                    </>
                  )}
                </Button>
                {bootstrapMutation.isError && (
                  <p className="text-sm text-destructive">
                    Failed to complete setup. Please try again.
                  </p>
                )}
              </div>
            )}

            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
              Return to Home
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
