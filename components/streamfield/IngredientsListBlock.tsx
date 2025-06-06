import type { recipeBlocks } from '@/models/blocks/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat } from 'lucide-react';

export default function IngredientsListBlock({
  block: { value },
}: {
  block: recipeBlocks.IngredientsList;
}) {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 ml-4">
          {value.map((ingredient, i) => (
            <li 
              key={i} 
              className="relative text-sm leading-relaxed pl-6 before:content-['🥄'] before:absolute before:left-0 before:top-0"
              dangerouslySetInnerHTML={{ __html: ingredient }} 
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
