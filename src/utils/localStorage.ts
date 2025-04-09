
// Helper functions for localStorage access

import { Recipe } from "@/data/recipes";

const USER_RECIPES_KEY = "user_recipes";
const SAVED_RECIPES_KEY = "saved_recipes";

// Get user-submitted recipes from localStorage
export const getUserRecipesFromLocalStorage = (): Recipe[] => {
  const storedRecipes = localStorage.getItem(USER_RECIPES_KEY);
  if (storedRecipes) {
    return JSON.parse(storedRecipes);
  }
  return [];
};

// Save user-submitted recipe to localStorage
export const saveUserRecipeToLocalStorage = (recipe: Omit<Recipe, "id">): Recipe => {
  const userRecipes = getUserRecipesFromLocalStorage();
  
  // Create a new recipe with a unique ID
  const newRecipe: Recipe = {
    ...recipe,
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  
  // Add to existing recipes
  userRecipes.push(newRecipe);
  
  // Save back to localStorage
  localStorage.setItem(USER_RECIPES_KEY, JSON.stringify(userRecipes));
  
  return newRecipe;
};

// Get saved (favorite) recipes from localStorage
export const getSavedRecipesFromLocalStorage = (): Recipe[] => {
  const savedRecipes = localStorage.getItem(SAVED_RECIPES_KEY);
  if (savedRecipes) {
    return JSON.parse(savedRecipes);
  }
  return [];
};

// Save recipe to favorites
export const saveRecipeToFavorites = (recipe: Recipe): void => {
  const savedRecipes = getSavedRecipesFromLocalStorage();
  
  // Check if already saved
  const isAlreadySaved = savedRecipes.some(saved => saved.id === recipe.id);
  
  if (!isAlreadySaved) {
    savedRecipes.push(recipe);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes));
  }
};

// Remove recipe from favorites
export const removeRecipeFromFavorites = (recipeId: string): void => {
  const savedRecipes = getSavedRecipesFromLocalStorage();
  const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
  localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updatedRecipes));
};

// Check if a recipe is saved to favorites
export const isRecipeSaved = (recipeId: string): boolean => {
  const savedRecipes = getSavedRecipesFromLocalStorage();
  return savedRecipes.some(recipe => recipe.id === recipeId);
};
