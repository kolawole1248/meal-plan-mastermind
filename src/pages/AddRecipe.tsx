
import React from 'react';
import Header from '@/components/Header';
import AddRecipeForm from '@/components/AddRecipeForm';
import { ChefHat } from 'lucide-react';

const AddRecipe: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <ChefHat size={48} className="mx-auto text-recipe-green mb-2" />
          <h1 className="text-3xl font-bold mb-2">Add Your Recipe</h1>
          <p className="text-gray-600">Share your culinary creations with the world</p>
        </section>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <AddRecipeForm />
        </div>
      </main>
    </div>
  );
};

export default AddRecipe;
