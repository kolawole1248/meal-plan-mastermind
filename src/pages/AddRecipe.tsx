
import React, { useEffect } from 'react';

const AddRecipe: React.FC = () => {
  useEffect(() => {
    // Create and inject the HTML content
    const rootElement = document.getElementById('app-container');
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="recipe-app">
          <header class="app-header">
            <h1>Recipe Finder</h1>
            <nav>
              <a href="/">Home</a>
              <a href="/saved-recipes">Saved Recipes</a>
              <a href="/add-recipe" class="active">Add Recipe</a>
            </nav>
          </header>

          <main>
            <section class="add-recipe-section">
              <h2>Add Your Recipe</h2>
              <form id="add-recipe-form" class="recipe-form">
                <div class="form-grid">
                  <div class="form-column">
                    <div class="form-group">
                      <label for="recipe-name">Recipe Name*</label>
                      <input type="text" id="recipe-name" required>
                    </div>
                    
                    <div class="form-group">
                      <label for="recipe-description">Description*</label>
                      <textarea id="recipe-description" rows="3" required></textarea>
                    </div>
                    
                    <div class="form-row">
                      <div class="form-group">
                        <label for="prep-time">Prep Time (min)*</label>
                        <input type="number" id="prep-time" min="0" required>
                      </div>
                      
                      <div class="form-group">
                        <label for="cook-time">Cook Time (min)*</label>
                        <input type="number" id="cook-time" min="0" required>
                      </div>
                      
                      <div class="form-group">
                        <label for="servings">Servings*</label>
                        <input type="number" id="servings" min="1" required>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label for="difficulty">Difficulty*</label>
                      <select id="difficulty" required>
                        <option value="">Select difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label>Categories*</label>
                      <div class="categories-container" id="categories-container">
                        <!-- Categories will be populated here -->
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-column">
                    <div class="form-group">
                      <label for="recipe-image">Recipe Image URL*</label>
                      <input type="text" id="recipe-image" required>
                    </div>
                    
                    <div id="image-preview" class="image-preview"></div>
                    
                    <div class="form-group">
                      <label>Ingredients*</label>
                      <div id="ingredients-container">
                        <div class="ingredient-row">
                          <input type="text" class="ingredient-input" placeholder="e.g., 2 cups flour">
                          <button type="button" class="remove-btn">✕</button>
                        </div>
                      </div>
                      <button type="button" id="add-ingredient" class="add-btn">+ Add Ingredient</button>
                    </div>
                    
                    <div class="form-group">
                      <label>Instructions*</label>
                      <div id="instructions-container">
                        <div class="instruction-row">
                          <input type="text" class="instruction-input" placeholder="Step 1">
                          <button type="button" class="remove-btn">✕</button>
                        </div>
                      </div>
                      <button type="button" id="add-instruction" class="add-btn">+ Add Instruction</button>
                    </div>
                  </div>
                </div>
                
                <div class="form-submit">
                  <button type="submit" id="submit-recipe" class="submit-btn">Submit Recipe</button>
                </div>
              </form>
            </section>
          </main>
        </div>
      `;

      // Add the CSS styles
      if (!document.getElementById('recipe-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'recipe-styles';
        styleElement.textContent = `
          .recipe-app {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
          }

          .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background-color: #4CAF50;
            color: white;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
          }

          .app-header h1 {
            margin: 0;
          }

          .app-header nav {
            display: flex;
            gap: 1rem;
          }

          .app-header a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            transition: background-color 0.3s;
          }

          .app-header a.active, .app-header a:hover {
            background-color: #2E7D32;
          }

          .add-recipe-section {
            padding: 1rem;
          }

          .add-recipe-section h2 {
            text-align: center;
            margin-bottom: 2rem;
          }

          .recipe-form {
            background-color: white;
            border-radius: 0.5rem;
            padding: 2rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          input, select, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.25rem;
            font-size: 1rem;
          }

          textarea {
            resize: vertical;
          }

          .categories-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .category-checkbox {
            display: inline-flex;
            align-items: center;
            background-color: #f1f1f1;
            padding: 0.5rem 0.75rem;
            border-radius: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .category-checkbox.selected {
            background-color: #4CAF50;
            color: white;
          }

          .category-checkbox input {
            display: none;
          }

          .image-preview {
            width: 100%;
            height: 200px;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: #f1f1f1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
          }

          .image-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .ingredient-row, .instruction-row {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            align-items: center;
          }

          .ingredient-input, .instruction-input {
            flex: 1;
          }

          .remove-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #f1f1f1;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            color: #666;
            transition: background-color 0.3s, color 0.3s;
          }

          .remove-btn:hover {
            background-color: #ff5252;
            color: white;
          }

          .add-btn {
            background: none;
            border: none;
            color: #4CAF50;
            cursor: pointer;
            font-weight: 500;
            padding: 0.5rem 0;
            transition: color 0.3s;
          }

          .add-btn:hover {
            color: #2E7D32;
          }

          .form-submit {
            margin-top: 2rem;
            text-align: center;
          }

          .submit-btn {
            padding: 0.75rem 2rem;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0.25rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .submit-btn:hover {
            background-color: #2E7D32;
          }

          .toast {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            background-color: #4CAF50;
            color: white;
            border-radius: 0.25rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
          }

          .toast.show {
            transform: translateY(0);
            opacity: 1;
          }

          .toast.error {
            background-color: #ff5252;
          }
        `;
        document.head.appendChild(styleElement);
      }

      // Add JavaScript
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = `
        // Available categories
        const availableCategories = [
          "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", 
          "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", 
          "Italian", "Mexican", "Asian", "Indian", "American", 
          "Quick", "Healthy", "Comfort Food", "Baking", "Grilling"
        ];

        // DOM elements
        const form = document.getElementById('add-recipe-form');
        const categoriesContainer = document.getElementById('categories-container');
        const ingredientsContainer = document.getElementById('ingredients-container');
        const addIngredientBtn = document.getElementById('add-ingredient');
        const instructionsContainer = document.getElementById('instructions-container');
        const addInstructionBtn = document.getElementById('add-instruction');
        const imageInput = document.getElementById('recipe-image');
        const imagePreview = document.getElementById('image-preview');

        // Initialize categories
        function initializeCategories() {
          categoriesContainer.innerHTML = '';
          availableCategories.forEach(category => {
            const categoryLabel = document.createElement('label');
            categoryLabel.className = 'category-checkbox';
            categoryLabel.innerHTML = \`
              <input type="checkbox" value="\${category}">
              \${category}
            \`;
            
            categoryLabel.addEventListener('click', () => {
              categoryLabel.classList.toggle('selected');
            });
            
            categoriesContainer.appendChild(categoryLabel);
          });
        }

        // Add ingredient field
        function addIngredientField() {
          const row = document.createElement('div');
          row.className = 'ingredient-row';
          row.innerHTML = \`
            <input type="text" class="ingredient-input" placeholder="e.g., 2 cups flour">
            <button type="button" class="remove-btn">✕</button>
          \`;
          
          row.querySelector('.remove-btn').addEventListener('click', () => {
            if (document.querySelectorAll('.ingredient-row').length > 1) {
              row.remove();
            }
          });
          
          ingredientsContainer.appendChild(row);
        }

        // Add instruction field
        function addInstructionField() {
          const row = document.createElement('div');
          row.className = 'instruction-row';
          row.innerHTML = \`
            <input type="text" class="instruction-input" placeholder="Step \${document.querySelectorAll('.instruction-row').length + 1}">
            <button type="button" class="remove-btn">✕</button>
          \`;
          
          row.querySelector('.remove-btn').addEventListener('click', () => {
            if (document.querySelectorAll('.instruction-row').length > 1) {
              row.remove();
              
              // Update step numbers
              document.querySelectorAll('.instruction-input').forEach((input, index) => {
                input.placeholder = \`Step \${index + 1}\`;
              });
            }
          });
          
          instructionsContainer.appendChild(row);
        }

        // Show image preview
        function updateImagePreview() {
          const url = imageInput.value;
          if (url) {
            imagePreview.innerHTML = '<img src="' + url + '" alt="Recipe Preview">';
            
            // Handle image load error
            const img = imagePreview.querySelector('img');
            img.onerror = () => {
              imagePreview.innerHTML = 'Invalid image URL';
            };
          } else {
            imagePreview.innerHTML = 'Image preview will appear here';
          }
        }

        // Show toast notification
        function showToast(message, isError = false) {
          // Remove existing toast
          const existingToast = document.querySelector('.toast');
          if (existingToast) {
            existingToast.remove();
          }
          
          // Create new toast
          const toast = document.createElement('div');
          toast.className = \`toast \${isError ? 'error' : ''}\`;
          toast.textContent = message;
          document.body.appendChild(toast);
          
          // Show toast
          setTimeout(() => {
            toast.classList.add('show');
          }, 10);
          
          // Hide toast after 3 seconds
          setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
              toast.remove();
            }, 300);
          }, 3000);
        }

        // Submit form
        function handleSubmit(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('recipe-name').value;
          const description = document.getElementById('recipe-description').value;
          const prepTime = parseInt(document.getElementById('prep-time').value);
          const cookTime = parseInt(document.getElementById('cook-time').value);
          const servings = parseInt(document.getElementById('servings').value);
          const difficulty = document.getElementById('difficulty').value;
          const imageURL = document.getElementById('recipe-image').value;
          
          // Get selected categories
          const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox.selected'))
            .map(label => label.textContent.trim());
          
          // Get ingredients
          const ingredients = Array.from(document.querySelectorAll('.ingredient-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');
          
          // Get instructions
          const instructions = Array.from(document.querySelectorAll('.instruction-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');
          
          // Validate inputs
          if (!name || !description || !prepTime || !cookTime || !servings || !difficulty || !imageURL) {
            showToast('Please fill in all required fields', true);
            return;
          }
          
          if (selectedCategories.length === 0) {
            showToast('Please select at least one category', true);
            return;
          }
          
          if (ingredients.length === 0) {
            showToast('Please add at least one ingredient', true);
            return;
          }
          
          if (instructions.length === 0) {
            showToast('Please add at least one instruction', true);
            return;
          }
          
          // Create recipe object
          const recipe = {
            id: 'user-' + Date.now(),
            name,
            description,
            image: imageURL,
            prepTime,
            cookTime,
            servings,
            difficulty,
            ingredients,
            instructions,
            categories: selectedCategories,
          };
          
          // Save to localStorage
          let userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
          userRecipes.push(recipe);
          localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
          
          showToast('Recipe added successfully!');
          form.reset();
          
          // Reset form state
          document.querySelectorAll('.category-checkbox').forEach(label => {
            label.classList.remove('selected');
          });
          
          imagePreview.innerHTML = 'Image preview will appear here';
          
          // Reset to initial state
          ingredientsContainer.innerHTML = '';
          instructionsContainer.innerHTML = '';
          addIngredientField();
          addInstructionField();
          
          // Redirect after 1.5 seconds
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }

        // Initialize
        function init() {
          initializeCategories();
          addIngredientBtn.addEventListener('click', addIngredientField);
          addInstructionBtn.addEventListener('click', addInstructionField);
          
          imageInput.addEventListener('input', updateImagePreview);
          form.addEventListener('submit', handleSubmit);
          
          // Initialize with one field each
          addIngredientField();
          addInstructionField();
        }

        // Start the app
        init();
      `;
      document.body.appendChild(scriptElement);
    }

    // Cleanup function
    return () => {
      const script = document.querySelector('script:not([src])');
      if (script) script.remove();
    };
  }, []);

  return <div id="app-container" className="min-h-screen bg-background"></div>;
};

export default AddRecipe;
