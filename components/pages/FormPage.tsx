import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function FormPage({
  page,
}: PageComponentProps<base.FormPage>) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="section-title">{page.title}</h1>
        <div className="prose prose-lg mx-auto">
          {page.body.map(({ id, value }) => (
            <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form action={`/${page.meta.slug}`} method="POST" className="space-y-6">
            {page.form_fields.map((field) => (
              <div key={field.id}>
                <label 
                  htmlFor={`id_${field.id}`}
                  className="block text-sm font-semibold text-brown-800 mb-2"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                  )}
                </label>

                {field.help_text && (
                  <p 
                    id={`help_${field.id}`} 
                    className="text-sm text-brown-600 mb-2"
                  >
                    {field.help_text}
                  </p>
                )}

                {field.field_type === 'select' ? (
                  <select
                    id={`id_${field.id}`}
                    name={`field_${field.id}`}
                    required={field.required}
                    aria-describedby={
                      field.help_text ? `help_${field.id}` : undefined
                    }
                    defaultValue={field.default_value ?? ''}
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-500 focus:border-transparent"
                  >
                    {field.choices?.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                ) : field.field_type === 'textarea' ? (
                  <textarea
                    id={`id_${field.id}`}
                    name={`field_${field.id}`}
                    required={field.required}
                    aria-describedby={
                      field.help_text ? `help_${field.id}` : undefined
                    }
                    defaultValue={field.default_value ?? ''}
                    rows={4}
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-500 focus:border-transparent resize-vertical"
                  />
                ) : (
                  <input
                    id={`id_${field.id}`}
                    type={field.field_type}
                    name={`field_${field.id}`}
                    required={field.required}
                    aria-describedby={
                      field.help_text ? `help_${field.id}` : undefined
                    }
                    defaultValue={field.default_value ?? ''}
                    className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full btn-primary text-lg py-3"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
