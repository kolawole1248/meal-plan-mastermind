
import { Recipe } from "@/data/recipes";

export const saveRecipeToLocalStorage = (recipe: Recipe): void => {
  try {
    const savedRecipes = getSavedRecipesFromLocalStorage();
    
    // Check if recipe already exists in saved recipes
    if (!savedRecipes.find(r => r.id === recipe.id)) {
      savedRecipes.push(recipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
  } catch (error) {
    console.error('Failed to save recipe to local storage:', error);
  }
};

export const removeSavedRecipeFromLocalStorage = (recipeId: string): void => {
  try {
    const savedRecipes = getSavedRecipesFromLocalStorage();
    const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  } catch (error) {
    console.error('Failed to remove recipe from local storage:', error);
  }
};

export const getSavedRecipesFromLocalStorage = (): Recipe[] => {
  try {
    const savedRecipes = localStorage.getItem('savedRecipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  } catch (error) {
    console.error('Failed to get saved recipes from local storage:', error);
    return [];
  }
};

export const saveUserRecipeToLocalStorage = (recipe: Recipe): void => {
  try {
    const userRecipes = getUserRecipesFromLocalStorage();
    
    // Create a new recipe with a unique ID
    const newRecipe = {
      ...recipe,
      id: `user-${Date.now()}`
    };
    
    userRecipes.push(newRecipe);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    
    return newRecipe;
  } catch (error) {
    console.error('Failed to save user recipe to local storage:', error);
  }
};

export const getUserRecipesFromLocalStorage = (): Recipe[] => {
  try {
    const userRecipes = localStorage.getItem('userRecipes');
    return userRecipes ? JSON.parse(userRecipes) : [];
  } catch (error) {
    console.error('Failed to get user recipes from local storage:', error);
    return [];
  }
};

export const removeUserRecipeFromLocalStorage = (recipeId: string): void => {
  try {
    const userRecipes = getUserRecipesFromLocalStorage();
    const updatedUserRecipes = userRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('userRecipes', JSON.stringify(updatedUserRecipes));
  } catch (error) {
    console.error('Failed to remove user recipe from local storage:', error);
  }
};

export const isRecipeSaved = (recipeId: string): boolean => {
  const savedRecipes = getSavedRecipesFromLocalStorage();
  return savedRecipes.some(recipe => recipe.id === recipeId);
};
