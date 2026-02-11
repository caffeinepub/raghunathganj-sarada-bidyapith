import React from 'react';
import { usePublishedGallery } from '../hooks/usePublicContent';
import LoadingSection from '../components/state/LoadingSection';
import ErrorSection from '../components/state/ErrorSection';
import { Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const { data: gallery, isLoading, isError } = usePublishedGallery();

  return (
    <div className="container py-12 space-y-8">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <ImageIcon className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Explore moments from our school life, events, and activities.
        </p>
      </section>

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
            <div
              key={id}
              className="aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer"
            >
              <img
                src={blob.getDirectURL()}
                alt="Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Images Yet</h3>
          <p className="text-muted-foreground">Gallery images will be added soon.</p>
        </div>
      )}
    </div>
  );
}
