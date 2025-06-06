import type { blocks } from '@/models/blocks/base';

export default function HeadingBlock({
  block: { value },
}: { block: blocks.HeadingBlock }) {
  const baseClasses = "font-bold text-brown-900 mb-4 mt-8";
  
  switch (value.size) {
    case 'h2':
      return <h2 className={`text-3xl ${baseClasses}`}>{value.heading_text}</h2>;
    case 'h3':
      return <h3 className={`text-2xl ${baseClasses}`}>{value.heading_text}</h3>;
    case 'h4':
      return <h4 className={`text-xl ${baseClasses}`}>{value.heading_text}</h4>;
    default:
      return <p className="text-red-600 bg-red-50 p-2 rounded">Unsupported heading size: {value.size}</p>;
  }
}
