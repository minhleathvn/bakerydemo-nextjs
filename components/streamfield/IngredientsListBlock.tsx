import type { recipeBlocks } from '@/models/blocks/recipes';

export default function IngredientsListBlock({
  block: { value },
}: {
  block: recipeBlocks.IngredientsList;
}) {
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md border border-brown-200">
      <h3 className="text-2xl font-bold text-brown-900 mb-6 flex items-center">
        <span className="w-6 h-6 bg-bakery-500 rounded-full mr-3 flex items-center justify-center">
          <span className="text-white text-sm">🥖</span>
        </span>
        Ingredients
      </h3>
      <ul className="space-y-3">
        {value.map((ingredient, i) => (
          <li key={i} className="flex items-start text-brown-700">
            <span className="w-2 h-2 bg-bakery-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <div 
              className="ingredient-content"
              dangerouslySetInnerHTML={{ __html: ingredient }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
