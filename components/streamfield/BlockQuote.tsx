import type { blocks } from '@/models/blocks/base';

export default function BlockQuote({
  block: { value },
}: { block: blocks.BlockQuote }) {
  return (
    <blockquote className="my-8 p-6 bg-bakery-50 border-l-4 border-bakery-500 rounded-r-lg">
      <p className="text-lg text-brown-800 italic leading-relaxed mb-4">
        "{value.text}"
      </p>
      {value.attribute_name && (
        <cite className="text-brown-600 font-medium">
          — {value.attribute_name}
        </cite>
      )}
    </blockquote>
  );
}
