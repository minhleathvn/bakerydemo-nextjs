import type { locations } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function LocationPage({
  page,
}: PageComponentProps<locations.LocationPage>) {
  return (
    <article className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        {page.image && (
          <div className="mb-8">
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={800}
              height={400}
              priority
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-brown-900 mb-4">{page.title}</h1>
        {page.introduction && (
          <p className="text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
            {page.introduction}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <section className="lg:col-span-2">
          <div className="prose prose-lg mx-auto">
            <BaseStreamBlock blocks={page.body} />
          </div>
        </section>

        {/* Location Details Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 className="text-xl font-bold text-brown-800 mb-6 border-b border-brown-200 pb-3">
              Location Details
            </h3>
            
            <div className="space-y-6">
              {/* Operating Status */}
              <div>
                <h4 className="font-semibold text-brown-800 mb-2">Operating Status</h4>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  page.is_open 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    page.is_open ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {page.is_open ? 'Currently Open' : 'Currently Closed'}
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="font-semibold text-brown-800 mb-2">Address</h4>
                <address className="text-brown-600 not-italic">{page.address}</address>
              </div>

              {/* Opening Hours */}
              {page.hours_of_operation.length > 0 && (
                <div>
                  <h4 className="font-semibold text-brown-800 mb-3">Opening Hours</h4>
                  <div className="space-y-2">
                    {page.hours_of_operation.map((hours) => (
                      <div key={hours.day} className="flex justify-between items-center text-sm">
                        <span className="font-medium text-brown-700">{hours.day}</span>
                        <span className="text-brown-600">
                          {hours.closed ? (
                            <span className="text-red-600">Closed</span>
                          ) : (
                            <>
                              {hours.opening_time && (
                                <time dateTime={hours.opening_time}>
                                  {hours.opening_time}
                                </time>
                              )}
                              {' - '}
                              {hours.closing_time && (
                                <time dateTime={hours.closing_time}>
                                  {hours.closing_time}
                                </time>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
