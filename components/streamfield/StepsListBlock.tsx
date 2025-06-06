import type { recipeBlocks } from '@/models/blocks/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListOrdered } from 'lucide-react';

const difficultyLabels = {
  S: 'Easy',
  M: 'Medium',
  L: 'Hard',
} as const;

const getDifficultyBadge = (difficulty: 'S' | 'M' | 'L') => {
  switch (difficulty) {
    case 'S':
      return (
        <Badge className="text-xs font-medium px-3 py-1 bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
          {difficultyLabels[difficulty]}
        </Badge>
      );
    case 'M':
      return (
        <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
          {difficultyLabels[difficulty]}
        </Badge>
      );
    case 'L':
      return (
        <Badge variant="destructive" className="text-xs font-medium px-3 py-1">
          {difficultyLabels[difficulty]}
        </Badge>
      );
  }
};

export default function StepsListBlock({
  block: { value },
}: {
  block: recipeBlocks.StepsList;
}) {
  return (
    <Card className="my-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <ListOrdered className="h-6 w-6" />
          Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-8">
          {value.map((step, i) => (
            <div key={i} className="relative">
              {/* Step number and content */}
              <div className="flex gap-6">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl text-lg font-bold shadow-lg">
                    {i + 1}
                  </div>
                </div>
                
                {/* Step content */}
                <div className="flex-1 pt-1">
                  <div 
                    className="text-foreground leading-7 mb-3 [&>p]:mb-2 [&>p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: step.text }} 
                  />
                  {getDifficultyBadge(step.difficulty)}
                </div>
              </div>
              
              {/* Connecting line (except for last step) */}
              {i < value.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
