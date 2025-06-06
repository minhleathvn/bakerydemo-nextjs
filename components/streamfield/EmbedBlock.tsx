import type { blocks } from '@/models/blocks/base';

export default function EmbedBlock({
  block: { value },
}: { block: blocks.EmbedBlock }) {
  return (
    <div className="my-8 flex justify-center">
      <div 
        className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg"
        dangerouslySetInnerHTML={{ __html: value.html }} 
      />
    </div>
  );
}
