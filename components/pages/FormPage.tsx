import type { base } from '@/models';
import type { PageComponentProps } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default async function FormPage({
  page,
}: PageComponentProps<base.FormPage>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {page.title}
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            {page.body.map(({ id, value }) => (
              <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={`/${page.meta.slug}`} method="POST" className="space-y-6">
                {page.form_fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={`id_${field.id}`} className="text-sm font-medium">
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1" aria-hidden="true">*</span>
                      )}
                    </Label>

                    {field.help_text && (
                      <p id={`help_${field.id}`} className="text-sm text-muted-foreground">
                        {field.help_text}
                      </p>
                    )}

                    {field.field_type === 'select' ? (
                      <Select
                        name={`field_${field.id}`}
                        required={field.required}
                        defaultValue={field.default_value ?? ''}
                      >
                        <SelectTrigger id={`id_${field.id}`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.choices?.map((choice) => (
                            <SelectItem key={choice} value={choice}>
                              {choice}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.field_type === 'textarea' ? (
                      <Textarea
                        id={`id_${field.id}`}
                        name={`field_${field.id}`}
                        required={field.required}
                        aria-describedby={
                          field.help_text ? `help_${field.id}` : undefined
                        }
                        defaultValue={field.default_value ?? ''}
                        rows={4}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <Input
                        id={`id_${field.id}`}
                        type={field.field_type}
                        name={`field_${field.id}`}
                        required={field.required}
                        aria-describedby={
                          field.help_text ? `help_${field.id}` : undefined
                        }
                        defaultValue={field.default_value ?? ''}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Submit Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
