
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Minus, Upload } from 'lucide-react';
import { recipeCategories, Recipe } from '@/data/recipes';
import { saveUserRecipeToLocalStorage } from '@/utils/localStorage';
import { toast } from 'sonner';

// Remove 'All' category from the form options
const formCategories = recipeCategories.filter(category => category !== 'All');

const recipeSchema = z.object({
  name: z.string().min(3, { message: "Recipe name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  prepTime: z.coerce.number().min(1, { message: "Prep time is required" }),
  cookTime: z.coerce.number().min(0, { message: "Cook time cannot be negative" }),
  servings: z.coerce.number().min(1, { message: "Servings must be at least 1" }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Please select a difficulty level",
  }),
  categories: z.array(z.string()).nonempty({ message: "Select at least one category" }),
});

type FormValues = z.infer<typeof recipeSchema>;

const AddRecipeForm: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [imageURL, setImageURL] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(recipeSchema),
  });

  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageURL(url);
    setPreviewImage(url);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredientField = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstructionField = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstructionField = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(newInstructions);
    }
  };

  const onSubmit = (data: FormValues) => {
    // Filter out empty ingredients and instructions
    const filteredIngredients = ingredients.filter(item => item.trim() !== '');
    const filteredInstructions = instructions.filter(item => item.trim() !== '');
    
    if (filteredIngredients.length === 0) {
      toast.error('Add at least one ingredient');
      return;
    }
    
    if (filteredInstructions.length === 0) {
      toast.error('Add at least one instruction');
      return;
    }
    
    if (!imageURL) {
      toast.error('Please provide a recipe image URL');
      return;
    }

    // Create the recipe object
    const newRecipe: Omit<Recipe, 'id'> = {
      name: data.name,
      description: data.description,
      image: imageURL,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      difficulty: data.difficulty,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      categories: data.categories,
    };

    // Save to localStorage
    saveUserRecipeToLocalStorage(newRecipe as Recipe);
    toast.success('Recipe added successfully!');

    // Reset the form
    reset();
    setIngredients(['']);
    setInstructions(['']);
    setImageURL('');
    setPreviewImage('');
    setSelectedCategories([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
              placeholder="Enter recipe name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
              placeholder="Brief description of the recipe"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (min) *
              </label>
              <input
                id="prepTime"
                type="number"
                min="0"
                {...register('prepTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
              />
              {errors.prepTime && (
                <p className="mt-1 text-sm text-red-600">{errors.prepTime.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
                Cook Time (min) *
              </label>
              <input
                id="cookTime"
                type="number"
                min="0"
                {...register('cookTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
              />
              {errors.cookTime && (
                <p className="mt-1 text-sm text-red-600">{errors.cookTime.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                Servings *
              </label>
              <input
                id="servings"
                type="number"
                min="1"
                {...register('servings')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
              />
              {errors.servings && (
                <p className="mt-1 text-sm text-red-600">{errors.servings.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty *
            </label>
            <select
              id="difficulty"
              {...register('difficulty')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories *
            </label>
            <div className="flex flex-wrap gap-2">
              {formCategories.map(category => (
                <label
                  key={category}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-recipe-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    value={category}
                    {...register('categories')}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
            {errors.categories && (
              <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Image URL *
            </label>
            <div className="flex gap-2">
              <input
                id="image"
                type="text"
                value={imageURL}
                onChange={handleImageURLChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
                placeholder="Enter image URL"
              />
            </div>
            {previewImage && (
              <div className="mt-3 w-full h-48 rounded-md overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Recipe preview" 
                  onError={() => setPreviewImage('')}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients *
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
                  placeholder="e.g., 2 cups flour"
                />
                <button
                  type="button"
                  onClick={() => removeIngredientField(index)}
                  className="p-2 text-gray-500 hover:text-red-500"
                  disabled={ingredients.length === 1}
                >
                  <Minus size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredientField}
              className="mt-2 flex items-center text-recipe-green hover:text-recipe-dark-green"
            >
              <Plus size={18} className="mr-1" /> Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions *
            </label>
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-green"
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeInstructionField(index)}
                  className="p-2 text-gray-500 hover:text-red-500"
                  disabled={instructions.length === 1}
                >
                  <Minus size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addInstructionField}
              className="mt-2 flex items-center text-recipe-green hover:text-recipe-dark-green"
            >
              <Plus size={18} className="mr-1" /> Add Instruction
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-recipe-green text-white font-medium rounded-lg hover:bg-recipe-dark-green transition-colors focus:outline-none focus:ring-2 focus:ring-recipe-green focus:ring-offset-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
