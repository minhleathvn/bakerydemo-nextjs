import BlockQuote from './BlockQuote';
import EmbedBlock from './EmbedBlock';
import HeadingBlock from './HeadingBlock';
import CaptionedImageBlock from './CaptionedImageBlock';
import RichTextBlock from './RichTextBlock';
import TableBlock from './TableBlock';
import TypedTableBlock from './TypedTableBlock';
import IngredientsListBlock from './IngredientsListBlock';
import StepsListBlock from './StepsListBlock';
import type { recipeBlocks } from '@/models/blocks/recipes';

const blockComponents = {
  // Base blocks
  heading_block: HeadingBlock,
  paragraph_block: RichTextBlock,
  image_block: CaptionedImageBlock,
  block_quote: BlockQuote,
  embed_block: EmbedBlock,
  // Recipe blocks
  table_block: TableBlock,
  typed_table_block: TypedTableBlock,
  ingredients_list: IngredientsListBlock,
  steps_list: StepsListBlock,
} as const;

type BlockComponent = React.ComponentType<{
  block: recipeBlocks.RecipeStreamBlock[number];
}>;

interface RecipeStreamBlockProps {
  blocks: recipeBlocks.RecipeStreamBlock;
}

export default function RecipeStreamBlock({ blocks }: RecipeStreamBlockProps) {
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
