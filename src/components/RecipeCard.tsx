
import React from 'react';
import { Recipe } from '@/data/recipes';
import { Heart, Clock } from 'lucide-react';
import { isRecipeSaved, saveRecipeToFavorites, removeRecipeFromFavorites } from '@/utils/localStorage';
import { toast } from 'sonner';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  showSaveButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = React.useState(false);
  
  React.useEffect(() => {
    setIsSaved(isRecipeSaved(recipe.id));
  }, [recipe.id]);
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isSaved) {
      removeRecipeFromFavorites(recipe.id);
      setIsSaved(false);
      toast.success('Recipe removed from saved recipes');
    } else {
      saveRecipeToFavorites(recipe);
      setIsSaved(true);
      toast.success('Recipe saved successfully');
    }
  };

  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <div 
      className="recipe-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium flex items-center">
              <Clock size={14} className="mr-1" /> {totalTime} min
            </span>
            <span className="bg-recipe-orange text-white text-xs px-2 py-1 rounded-full">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-left line-clamp-2">{recipe.name}</h3>
          {showSaveButton && (
            <button 
              onClick={handleSaveClick} 
              className={`p-2 rounded-full ${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
              aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
            >
              <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
        </div>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-2 text-left">{recipe.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.categories.slice(0, 3).map((category, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-recipe-beige text-recipe-brown rounded-full"
            >
              {category}
            </span>
          ))}
          {recipe.categories.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
              +{recipe.categories.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
