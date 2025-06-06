import Image from 'next/image';
import type { blocks } from '@/models/blocks/base';

export default function CaptionedImageBlock({
  block: { value },
}: { block: blocks.CaptionedImageBlock }) {
  const { meta } = value.image;

  return (
    <figure className="my-8">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={meta.download_url}
          alt={value.image.title}
          width={640}
          height={480}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </div>
      {(value.caption || value.attribution) && (
        <figcaption className="mt-3 text-sm text-center text-muted-foreground leading-relaxed">
          {value.caption && <span>{value.caption}</span>}
          {value.caption && value.attribution && <span> - </span>}
          {value.attribution && (
            <span className="font-medium">{value.attribution}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
