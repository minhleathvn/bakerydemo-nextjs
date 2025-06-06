import type { recipeBlocks } from '@/models/blocks/recipes';

const difficultyLabels = {
  S: 'Easy',
  M: 'Medium',
  L: 'Hard',
} as const;

export default function StepsListBlock({
  block: { value },
}: {
  block: recipeBlocks.StepsList;
}) {
  const getDifficultyColor = (difficulty: keyof typeof difficultyLabels) => {
    switch (difficulty) {
      case 'S': return 'bg-green-100 text-green-800';
      case 'M': return 'bg-yellow-100 text-yellow-800'; 
      case 'L': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md border border-brown-200">
      <h3 className="text-2xl font-bold text-brown-900 mb-6 flex items-center">
        <span className="w-6 h-6 bg-bakery-500 rounded-full mr-3 flex items-center justify-center">
          <span className="text-white text-sm">👨‍🍳</span>
        </span>
        Instructions
      </h3>
      <ol className="space-y-6">
        {value.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-bakery-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {i + 1}
            </span>
            <div className="flex-grow">
              <div 
                className="text-brown-700 leading-relaxed mb-2" 
                dangerouslySetInnerHTML={{ __html: step.text }} 
              />
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                {difficultyLabels[step.difficulty]}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
