import type { locations } from '@/models';
import type { PageComponentProps } from './types';
import LocationCard from '@/components/LocationCard';
import api from '@/lib/api';

export default async function LocationsIndexPage({
  page,
}: PageComponentProps<locations.LocationsIndexPage>) {
  // Get location pages that are children of the locations index page
  const { items: locations } = await api.getPages('locations.LocationPage', {
    child_of: page.id.toString(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {page.introduction}
          </p>
        </section>

        <section>
          {locations.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No locations found
              </h3>
              <p className="text-muted-foreground">
                We're expanding! Check back soon for new locations.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
