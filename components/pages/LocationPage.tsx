import type { locations } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

export default async function LocationPage({
  page,
}: PageComponentProps<locations.LocationPage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <section className="mb-8">
              {page.image && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={page.image.meta.download_url}
                    alt={page.image.title}
                    width={800}
                    height={600}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {page.title}
              </h1>
              {page.introduction && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page.introduction}
                </p>
              )}
            </section>

            <section className="prose prose-lg max-w-none">
              <BaseStreamBlock blocks={page.body} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Operating Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {page.is_open ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  Operating Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge 
                  variant={page.is_open ? "default" : "destructive"}
                  className="text-sm"
                >
                  {page.is_open 
                    ? 'Currently Open' 
                    : 'Currently Closed'
                  }
                </Badge>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="text-muted-foreground not-italic leading-relaxed">
                  {page.address}
                </address>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            {page.hours_of_operation.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {page.hours_of_operation.map((hours) => (
                      <div key={hours.day} className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {hours.day}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {hours.closed ? (
                            <Badge variant="outline" className="text-xs">
                              Closed
                            </Badge>
                          ) : (
                            <span>
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
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
