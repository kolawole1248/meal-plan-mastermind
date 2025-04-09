
import React from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '@/data/recipes';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  // Close modal when clicking outside the content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal on Escape key press
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-fade-in">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{recipe.name}</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <Clock size={18} className="mr-2 text-recipe-green" />
              <span>Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center">
              <ChefHat size={18} className="mr-2 text-recipe-green" />
              <span>Cook: {recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="mr-2 text-recipe-green" />
              <span>Servings: {recipe.servings}</span>
            </div>
            <div className="px-3 py-1 bg-recipe-orange text-white rounded-full text-sm">
              {recipe.difficulty}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700">{recipe.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-recipe-dark-green">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-recipe-dark-green">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-recipe-dark-green">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-recipe-beige text-recipe-brown rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          {recipe.nutrients && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-recipe-dark-green">Nutrition (per serving)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-semibold">{recipe.nutrients.calories}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="font-semibold">{recipe.nutrients.protein}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-semibold">{recipe.nutrients.carbs}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="font-semibold">{recipe.nutrients.fat}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
