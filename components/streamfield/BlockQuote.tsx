import type { blocks } from '@/models/blocks/base';

export default function BlockQuote({
  block: { value },
}: { block: blocks.BlockQuote }) {
  return (
    <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-muted/30 rounded-r-lg">
      <p className="text-lg italic text-foreground mb-3 leading-relaxed">
        "{value.text}"
      </p>
      {value.attribute_name && (
        <cite className="text-sm text-muted-foreground font-medium">
          — {value.attribute_name}
        </cite>
      )}
    </blockquote>
  );
}
