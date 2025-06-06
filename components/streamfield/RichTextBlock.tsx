import type { blocks } from '@/models/blocks/base';

export default function RichTextBlock({
  block,
}: { block: blocks.RichTextBlock }) {
  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
      dangerouslySetInnerHTML={{ __html: block.value }} 
    />
  );
}
