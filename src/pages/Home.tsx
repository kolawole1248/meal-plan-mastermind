
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import CategoryFilter from '@/components/CategoryFilter';
import { Recipe, recipeCategories } from '@/data/recipes';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch recipes from API or use sample data
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      
      try {
        // For now, we'll use sample data from the data/recipes.ts file
        // Later, you can replace this with your own API call
        const response = await import('@/data/recipes');
        const recipeData = response.sampleRecipes;
        
        // Simulate API delay
        setTimeout(() => {
          setRecipes(recipeData);
          setFilteredRecipes(recipeData);
          setIsLoading(false);
        }, 500);
        
        // Example of how to use Edamam API (commented out)
        // This is where you would add your API key and call
        /*
        const APP_ID = 'YOUR_APP_ID';
        const APP_KEY = 'YOUR_APP_KEY';
        const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=15`);
        const data = await response.json();
        const formattedRecipes = data.hits.map(hit => ({
          id: hit.recipe.uri.split('#')[1],
          name: hit.recipe.label,
          description: hit.recipe.source,
          image: hit.recipe.image,
          prepTime: Math.round(hit.recipe.totalTime / 2) || 15,
          cookTime: Math.round(hit.recipe.totalTime / 2) || 20,
          servings: hit.recipe.yield,
          difficulty: determineDifficulty(hit.recipe.ingredients.length, hit.recipe.totalTime),
          ingredients: hit.recipe.ingredientLines,
          instructions: ["See full instructions at source website"],
          categories: hit.recipe.cuisineType.concat(hit.recipe.mealType, hit.recipe.dishType)
        }));
        
        setRecipes(formattedRecipes);
        setFilteredRecipes(formattedRecipes);
        */
        
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on category and search term
  useEffect(() => {
    let result = recipes;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(recipe => 
        recipe.categories.some(category => 
          category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(recipe => 
        recipe.name.toLowerCase().includes(term) || 
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(term))
      );
    }
    
    setFilteredRecipes(result);
  }, [recipes, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Recipe Finder</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover delicious recipes for any meal. Save your favorites and create your own recipes.
          </p>
        </section>
        
        <section className="mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search recipes, ingredients, or categories..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-green focus:border-recipe-green focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </form>
        </section>
        
        <section className="mb-8">
          <CategoryFilter 
            categories={recipeCategories} 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </section>
        
        <section>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-recipe-green"></div>
            </div>
          ) : filteredRecipes.length > 0 ? (
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
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-700">No recipes found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </section>
      </main>
      
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={closeRecipeModal} 
        />
      )}
    </div>
  );
};

export default Home;
