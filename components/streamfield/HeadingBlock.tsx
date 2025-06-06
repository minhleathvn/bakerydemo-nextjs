import type { blocks } from '@/models/blocks/base';

export default function HeadingBlock({
  block: { value },
}: { block: blocks.HeadingBlock }) {
  const baseClasses = "font-bold text-foreground mb-4";
  
  switch (value.size) {
    case 'h2':
      return <h2 className={`text-3xl md:text-4xl ${baseClasses}`}>{value.heading_text}</h2>;
    case 'h3':
      return <h3 className={`text-2xl md:text-3xl ${baseClasses}`}>{value.heading_text}</h3>;
    case 'h4':
      return <h4 className={`text-xl md:text-2xl ${baseClasses}`}>{value.heading_text}</h4>;
    default:
      return <p className="text-muted-foreground">Unsupported heading size: {value.size}</p>;
  }
}
