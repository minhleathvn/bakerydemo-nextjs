import BlockQuote from './BlockQuote';
import EmbedBlock from './EmbedBlock';
import HeadingBlock from './HeadingBlock';
import CaptionedImageBlock from './CaptionedImageBlock';
import RichTextBlock from './RichTextBlock';
import type { blocks } from '@/models/blocks/base';

const blockComponents = {
  heading_block: HeadingBlock,
  paragraph_block: RichTextBlock,
  image_block: CaptionedImageBlock,
  block_quote: BlockQuote,
  embed_block: EmbedBlock,
} as const;

type BlockComponent = React.ComponentType<{
  block: blocks.BaseStreamBlock[number];
}>;

interface BaseStreamBlockProps {
  blocks: blocks.BaseStreamBlock;
}

export default function BaseStreamBlock({ blocks }: BaseStreamBlockProps) {
  return (
    <div className="streamfield-content">
      {blocks.map((block) => {
        const Block = blockComponents[block.type] as BlockComponent;
        return Block ? (
          <Block key={block.id} block={block} />
        ) : (
          <div key={block.id} className="my-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium mb-2">Unsupported block type: {block.type}</p>
            <pre className="text-xs text-red-600 overflow-x-auto">{JSON.stringify(block, null, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
}
