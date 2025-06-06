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
    <div className="space-y-6">
      {blocks.map((block) => {
        const Block = blockComponents[block.type] as BlockComponent;
        return Block ? (
          <Block key={block.id} block={block} />
        ) : (
          <div key={block.id} className="p-4 bg-muted rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
