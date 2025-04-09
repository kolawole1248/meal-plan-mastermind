
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import { Recipe, initialRecipes } from '@/data/recipes';
import { getUserRecipesFromLocalStorage } from '@/utils/localStorage';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Combine initial recipes with user-submitted recipes
    const userRecipes = getUserRecipesFromLocalStorage();
    setRecipes([...initialRecipes, ...userRecipes]);
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || recipe.categories.includes(selectedCategory);
    
    // Filter by search query
    const matchesSearchQuery = searchQuery === '' || 
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesCategory && matchesSearchQuery;
  });
  
  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };
  
  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Find Perfect Recipes</h1>
          <p className="text-gray-600 text-center mb-8">Discover delicious meals for every occasion</p>
          
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes by name, ingredients..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-recipe-green"
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory}
          />
        </section>
        
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                onClick={() => openRecipeModal(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No recipes found</h3>
            <p className="mt-2 text-gray-500">Try changing your search or filter criteria</p>
          </div>
        )}
      </main>
      
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
      )}
    </div>
  );
};

export default Home;
