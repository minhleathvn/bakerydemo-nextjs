import type { blocks } from '@/models/blocks/base';

export default function EmbedBlock({
  block: { value },
}: { block: blocks.EmbedBlock }) {
  return (
    <div className="my-8">
      <div 
        className="relative overflow-hidden rounded-lg [&>iframe]:w-full [&>iframe]:h-auto [&>iframe]:aspect-video"
        dangerouslySetInnerHTML={{ __html: value.html }} 
      />
    </div>
  );
}
