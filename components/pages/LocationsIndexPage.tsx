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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="section-title">{page.title}</h1>
        {page.introduction && (
          <p className="text-lg text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </section>

      {/* Locations Grid */}
      <section>
        {locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brown-600">No locations found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
