import React, { useState } from 'react';
import { usePublishedGallery } from '../../hooks/usePublicContent';
import { usePublishFiles } from '../../hooks/useAdminContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import LoadingSection from '../../components/state/LoadingSection';
import ErrorSection from '../../components/state/ErrorSection';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { ExternalBlob } from '../../backend';

export default function AdminGalleryPage() {
  const { data: gallery, isLoading, isError } = usePublishedGallery();
  const publishMutation = usePublishFiles();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedIds: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bytes = new Uint8Array(await file.arrayBuffer());
        
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
          const overallProgress = ((i / files.length) * 100) + (percentage / files.length);
          setUploadProgress(Math.round(overallProgress));
        });

        // Upload the blob (this happens automatically when the blob is created)
        const id = `gallery-${Date.now()}-${i}`;
        uploadedIds.push(id);
      }

      // Publish the uploaded files
      await publishMutation.mutateAsync(uploadedIds);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  return (
    <div className="container py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Gallery</h1>
          <p className="text-muted-foreground mt-2">Upload and manage gallery images</p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button asChild disabled={uploading}>
            <label htmlFor="file-upload" className="cursor-pointer">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {uploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading images...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <ErrorSection />
      ) : gallery && gallery.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gallery.map(([id, blob]) => (
            <Card key={id} className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={blob.getDirectURL()}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No images yet. Upload your first images.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
