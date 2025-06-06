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
    <div className="recipe-streamfield-content space-y-4">
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
