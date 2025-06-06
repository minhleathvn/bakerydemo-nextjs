import type { blocks } from '@/models/blocks/base';

export default function RichTextBlock({
  block,
}: { block: blocks.RichTextBlock }) {
  return (
    <div 
      className="my-6 text-brown-700 leading-relaxed prose prose-lg max-w-none prose-headings:text-brown-900 prose-p:text-brown-700 prose-a:text-bakery-600 prose-strong:text-brown-800"
      dangerouslySetInnerHTML={{ __html: block.value }} 
    />
  );
}
