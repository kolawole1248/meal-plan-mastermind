
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import { Recipe } from '@/data/recipes';
import { getSavedRecipesFromLocalStorage } from '@/utils/localStorage';
import { BookmarkX } from 'lucide-react';

const SavedRecipes: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Load saved recipes from localStorage
  const loadSavedRecipes = () => {
    const recipes = getSavedRecipesFromLocalStorage();
    setSavedRecipes(recipes);
  };

  useEffect(() => {
    loadSavedRecipes();
    // Set up event listener to refresh when localStorage changes
    window.addEventListener('storage', loadSavedRecipes);
    return () => {
      window.removeEventListener('storage', loadSavedRecipes);
    };
  }, []);
  
  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };
  
  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    // Reload saved recipes after closing modal in case a recipe was removed
    loadSavedRecipes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Saved Recipes</h1>
          <p className="text-gray-600 text-center">Your collection of favorite recipes</p>
        </section>
        
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                onClick={() => openRecipeModal(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookmarkX size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No saved recipes yet</h3>
            <p className="mt-2 text-gray-500 mb-4">Start saving your favorite recipes by clicking the heart icon</p>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-recipe-green text-white font-medium rounded-lg hover:bg-recipe-dark-green transition-colors"
            >
              Browse Recipes
            </a>
          </div>
        )}
      </main>
      
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
      )}
    </div>
  );
};

export default SavedRecipes;
