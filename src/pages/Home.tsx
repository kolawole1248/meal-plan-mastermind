
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    // Create and inject the HTML content
    const rootElement = document.getElementById('app-container');
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="recipe-app">
          <header class="app-header">
            <h1>Recipe Finder</h1>
            <nav>
              <a href="/" class="active">Home</a>
              <a href="/saved-recipes">Saved Recipes</a>
              <a href="/add-recipe">Add Recipe</a>
            </nav>
          </header>

          <main>
            <section class="search-section">
              <h2>Find Your Perfect Recipe</h2>
              <div class="search-container">
                <input type="text" id="search-input" placeholder="Search for recipes...">
                <button id="search-button">Search</button>
              </div>
              <div class="filter-container" id="category-filters">
                <!-- Categories will be populated here -->
              </div>
            </section>

            <section class="results-section">
              <div class="recipe-grid" id="recipe-container">
                <!-- Recipe cards will be loaded here -->
              </div>
              <div class="loading" id="loading">Loading recipes...</div>
            </section>
          </main>

          <div class="modal-overlay" id="recipe-modal">
            <div class="modal-content">
              <span class="close-modal">&times;</span>
              <div id="modal-content"></div>
            </div>
          </div>
        </div>
      `;

      // Add the CSS styles
      const styleElement = document.createElement('style');
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

        .search-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .search-container {
          display: flex;
          max-width: 600px;
          margin: 1rem auto;
        }

        .search-container input {
          flex: 1;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-right: none;
          border-radius: 0.25rem 0 0 0.25rem;
        }

        .search-container button {
          padding: 0.75rem 1.5rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 0 0.25rem 0.25rem 0;
          transition: background-color 0.3s;
        }

        .search-container button:hover {
          background-color: #2E7D32;
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .category-btn {
          background-color: #f1f1f1;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .category-btn.active {
          background-color: #4CAF50;
          color: white;
        }

        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }

        .recipe-card {
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
          background-color: white;
        }

        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .recipe-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .recipe-info {
          padding: 1rem;
        }

        .recipe-info h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }

        .recipe-meta {
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 0.9rem;
        }

        .recipe-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .recipe-category {
          font-size: 0.8rem;
          background-color: #f1f1f1;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          display: none;
        }

        .modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          z-index: 100;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 0.5rem;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background-color: #f1f1f1;
        }

        .recipe-detail-header {
          display: flex;
          margin-bottom: 1.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .recipe-detail-img {
          width: 300px;
          height: 200px;
          object-fit: cover;
          border-radius: 0.5rem;
          flex-shrink: 0;
        }

        .recipe-detail-info {
          flex: 1;
          min-width: 250px;
        }

        .recipe-detail-meta {
          display: flex;
          gap: 1.5rem;
          margin: 1rem 0;
        }

        .recipe-detail-meta > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .meta-value {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .meta-label {
          font-size: 0.9rem;
          color: #666;
        }

        .ingredients-section, .instructions-section {
          margin-bottom: 1.5rem;
        }

        .ingredients-list {
          list-style-type: disc;
          padding-left: 1.5rem;
        }

        .instructions-list {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }

        .save-recipe-btn {
          padding: 0.5rem 1rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0;
          transition: background-color 0.3s;
        }

        .save-recipe-btn:hover {
          background-color: #2E7D32;
        }

        .saved {
          background-color: #FF9800;
        }

        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            gap: 1rem;
          }

          .recipe-detail-header {
            flex-direction: column;
          }

          .recipe-detail-img {
            width: 100%;
            height: auto;
          }
        }
      `;
      document.head.appendChild(styleElement);

      // Add JavaScript
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = `
        // API config - Can be changed to use your preferred API
        const API_KEY = "YOUR_API_KEY";
        const API_URL = "https://api.edamam.com/api/recipes/v2";

        // For testing without actual API calls
        const SAMPLE_RECIPES = [
          {
            id: "recipe1",
            name: "Spaghetti Carbonara",
            description: "Classic Italian pasta dish with eggs, cheese, pancetta and pepper",
            image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=1974&auto=format&fit=crop",
            prepTime: 15,
            cookTime: 20,
            servings: 4,
            difficulty: "Medium",
            ingredients: [
              "400g spaghetti",
              "200g pancetta or guanciale, diced",
              "4 large eggs",
              "100g Pecorino Romano cheese, grated",
              "50g Parmesan cheese, grated",
              "Freshly ground black pepper",
              "Salt to taste"
            ],
            instructions: [
              "Bring a large pot of salted water to boil and cook the spaghetti until al dente.",
              "While the pasta is cooking, fry the pancetta in a large pan until crispy.",
              "In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.",
              "Drain the pasta, reserving some pasta water.",
              "Working quickly, add the hot pasta to the pancetta, remove from heat, and pour in the egg mixture.",
              "Toss everything rapidly, adding a splash of pasta water if needed to create a creamy sauce.",
              "Serve immediately with extra cheese and black pepper."
            ],
            categories: ["Italian", "Dinner", "Pasta"],
          },
          {
            id: "recipe2",
            name: "Avocado Toast",
            description: "Simple and nutritious breakfast or snack",
            image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=2070&auto=format&fit=crop",
            prepTime: 5,
            cookTime: 5,
            servings: 1,
            difficulty: "Easy",
            ingredients: [
              "2 slices whole grain bread",
              "1 ripe avocado",
              "2 eggs",
              "Salt and pepper to taste",
              "Red pepper flakes (optional)",
              "Fresh herbs like cilantro (optional)"
            ],
            instructions: [
              "Toast the bread until golden and firm.",
              "While the bread is toasting, fry the eggs to your preference (sunny-side up recommended).",
              "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
              "Mash the avocado with a fork and season with salt and pepper.",
              "Spread the mashed avocado on the toast.",
              "Top each toast with a fried egg.",
              "Sprinkle with salt, pepper, red pepper flakes, and fresh herbs if using."
            ],
            categories: ["Breakfast", "Vegetarian", "Quick", "Healthy"],
          },
          {
            id: "recipe3",
            name: "Chicken Curry",
            description: "Flavorful and aromatic curry with tender chicken pieces",
            image: "https://images.unsplash.com/photo-1604579839517-16a743f53c27?q=80&w=1974&auto=format&fit=crop",
            prepTime: 20,
            cookTime: 40,
            servings: 6,
            difficulty: "Medium",
            ingredients: [
              "800g chicken thighs, cut into pieces",
              "2 onions, finely chopped",
              "3 cloves garlic, minced",
              "1 thumb-sized piece of ginger, grated",
              "2 tbsp curry powder",
              "1 tsp turmeric",
              "1 tsp ground cumin",
              "1 tsp ground coriander",
              "1 can (400ml) coconut milk",
              "1 cup chicken stock",
              "2 tbsp vegetable oil",
              "Fresh cilantro for garnish",
              "Salt to taste"
            ],
            instructions: [
              "Heat oil in a large pot over medium heat.",
              "Add onions and cook until soft and translucent.",
              "Add garlic and ginger, cook for another minute until fragrant.",
              "Add all the spices and cook for 30 seconds, stirring constantly.",
              "Add the chicken pieces and cook until they start to color, about 5 minutes.",
              "Pour in the coconut milk and chicken stock, bring to a simmer.",
              "Reduce heat to low and cook covered for about 30 minutes until the chicken is tender.",
              "Adjust seasoning with salt.",
              "Garnish with fresh cilantro before serving."
            ],
            categories: ["Dinner", "Indian", "Spicy"],
          }
        ];

        // DOM elements
        const recipeContainer = document.getElementById('recipe-container');
        const categoryFilters = document.getElementById('category-filters');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const recipeModal = document.getElementById('recipe-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModal = document.querySelector('.close-modal');
        const loadingIndicator = document.getElementById('loading');

        // State
        let allRecipes = [];
        let filteredRecipes = [];
        let selectedCategory = 'All';
        let searchQuery = '';

        // Extract all unique categories from recipes
        function getAllCategories(recipes) {
          const categoriesSet = new Set(['All']);
          recipes.forEach(recipe => {
            recipe.categories.forEach(category => {
              categoriesSet.add(category);
            });
          });
          return Array.from(categoriesSet);
        }

        // Render category filter buttons
        function renderCategoryFilters(categories) {
          categoryFilters.innerHTML = '';
          categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.classList.add('category-btn');
            if (category === selectedCategory) {
              button.classList.add('active');
            }
            button.addEventListener('click', () => {
              selectedCategory = category;
              filterAndRenderRecipes();
              
              // Update active button
              document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
              });
              button.classList.add('active');
            });
            categoryFilters.appendChild(button);
          });
        }

        // Render recipe cards
        function renderRecipeCards(recipes) {
          recipeContainer.innerHTML = '';
          
          if (recipes.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'No recipes found. Try a different search or category.';
            noResults.style.gridColumn = '1 / -1';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '2rem';
            recipeContainer.appendChild(noResults);
            return;
          }
          
          recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            
            card.innerHTML = \`
              <img src="\${recipe.image}" alt="\${recipe.name}" class="recipe-image">
              <div class="recipe-info">
                <h3>\${recipe.name}</h3>
                <p>\${recipe.description.substring(0, 80)}\${recipe.description.length > 80 ? '...' : ''}</p>
                <div class="recipe-meta">
                  <span>\${recipe.prepTime + recipe.cookTime} min</span>
                  <span>\${recipe.difficulty}</span>
                </div>
                <div class="recipe-categories">
                  \${recipe.categories.slice(0, 3).map(cat => 
                    \`<span class="recipe-category">\${cat}</span>\`
                  ).join('')}
                </div>
              </div>
            \`;
            
            card.addEventListener('click', () => {
              openRecipeModal(recipe);
            });
            
            recipeContainer.appendChild(card);
          });
        }

        // Filter recipes based on category and search query
        function filterRecipes() {
          return allRecipes.filter(recipe => {
            const matchesCategory = selectedCategory === 'All' || recipe.categories.includes(selectedCategory);
            const matchesSearch = searchQuery === '' || 
              recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
            
            return matchesCategory && matchesSearch;
          });
        }

        // Filter and render recipes
        function filterAndRenderRecipes() {
          filteredRecipes = filterRecipes();
          renderRecipeCards(filteredRecipes);
        }

        // Open recipe modal
        function openRecipeModal(recipe) {
          modalContent.innerHTML = \`
            <div class="recipe-detail-header">
              <img src="\${recipe.image}" alt="\${recipe.name}" class="recipe-detail-img">
              <div class="recipe-detail-info">
                <h2>\${recipe.name}</h2>
                <p>\${recipe.description}</p>
                <div class="recipe-detail-meta">
                  <div>
                    <span class="meta-value">\${recipe.prepTime}</span>
                    <span class="meta-label">Prep (min)</span>
                  </div>
                  <div>
                    <span class="meta-value">\${recipe.cookTime}</span>
                    <span class="meta-label">Cook (min)</span>
                  </div>
                  <div>
                    <span class="meta-value">\${recipe.servings}</span>
                    <span class="meta-label">Servings</span>
                  </div>
                  <div>
                    <span class="meta-value">\${recipe.difficulty}</span>
                    <span class="meta-label">Difficulty</span>
                  </div>
                </div>
                <button class="save-recipe-btn" data-id="\${recipe.id}">
                  \${isSaved(recipe.id) ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>
              </div>
            </div>
            <div class="ingredients-section">
              <h3>Ingredients</h3>
              <ul class="ingredients-list">
                \${recipe.ingredients.map(ingredient => \`<li>\${ingredient}</li>\`).join('')}
              </ul>
            </div>
            <div class="instructions-section">
              <h3>Instructions</h3>
              <ol class="instructions-list">
                \${recipe.instructions.map(instruction => \`<li>\${instruction}</li>\`).join('')}
              </ol>
            </div>
          \`;
          
          // Add event listener to the save button
          const saveButton = modalContent.querySelector('.save-recipe-btn');
          saveButton.addEventListener('click', () => {
            const recipeId = saveButton.getAttribute('data-id');
            if (isSaved(recipeId)) {
              removeFromFavorites(recipeId);
              saveButton.textContent = 'Save to Favorites';
              saveButton.classList.remove('saved');
            } else {
              addToFavorites(recipe);
              saveButton.textContent = 'Saved to Favorites';
              saveButton.classList.add('saved');
            }
          });
          
          recipeModal.style.display = 'flex';
        }

        // Close recipe modal
        function closeRecipeModal() {
          recipeModal.style.display = 'none';
        }

        // Save and retrieve recipes from localStorage
        function addToFavorites(recipe) {
          let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
          if (!savedRecipes.some(r => r.id === recipe.id)) {
            savedRecipes.push(recipe);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
          }
        }

        function removeFromFavorites(recipeId) {
          let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
          savedRecipes = savedRecipes.filter(r => r.id !== recipeId);
          localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        }

        function isSaved(recipeId) {
          const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
          return savedRecipes.some(r => r.id === recipeId);
        }

        // Initialize
        function init() {
          // For demo, use sample recipes
          // In reality, you would fetch from API here
          allRecipes = SAMPLE_RECIPES;
          filteredRecipes = allRecipes;
          
          const categories = getAllCategories(allRecipes);
          renderCategoryFilters(categories);
          renderRecipeCards(filteredRecipes);
          
          // Add event listeners
          searchButton.addEventListener('click', () => {
            searchQuery = searchInput.value;
            filterAndRenderRecipes();
          });
          
          searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              searchQuery = searchInput.value;
              filterAndRenderRecipes();
            }
          });
          
          closeModal.addEventListener('click', closeRecipeModal);
          
          // Close modal when clicking outside content
          recipeModal.addEventListener('click', (e) => {
            if (e.target === recipeModal) {
              closeRecipeModal();
            }
          });
          
          // Example of how to fetch from API (commented out)
          /*
          async function fetchRecipes() {
            loadingIndicator.style.display = 'block';
            try {
              const response = await fetch(\`\${API_URL}?type=public&q=all&app_id=YOUR_APP_ID&app_key=\${API_KEY}\`);
              const data = await response.json();
              
              // Transform API data to match our format
              allRecipes = data.hits.map(hit => ({
                id: hit.recipe.uri.split('#')[1],
                name: hit.recipe.label,
                description: hit.recipe.source,
                image: hit.recipe.image,
                prepTime: Math.round(hit.recipe.totalTime / 2) || 15,
                cookTime: Math.round(hit.recipe.totalTime / 2) || 20,
                servings: hit.recipe.yield,
                difficulty: determineRecipeDifficulty(hit.recipe),
                ingredients: hit.recipe.ingredientLines,
                instructions: ["See full instructions at source website"], 
                categories: hit.recipe.cuisineType.concat(hit.recipe.mealType, hit.recipe.dishType)
              }));
              
              filteredRecipes = allRecipes;
              const categories = getAllCategories(allRecipes);
              renderCategoryFilters(categories);
              renderRecipeCards(filteredRecipes);
            } catch (error) {
              console.error("Error fetching recipes:", error);
              recipeContainer.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
            } finally {
              loadingIndicator.style.display = 'none';
            }
          }
          
          // Helper for API data
          function determineRecipeDifficulty(recipe) {
            const ingredientCount = recipe.ingredients.length;
            const time = recipe.totalTime;
            
            if (ingredientCount > 10 || time > 60) return "Hard";
            if (ingredientCount > 5 || time > 30) return "Medium";
            return "Easy";
          }
          
          // Call API fetch
          fetchRecipes();
          */
        }

        // Start the app
        init();
      `;
      document.body.appendChild(scriptElement);

      // Create app container div if it doesn't exist
      if (!document.getElementById('app-container')) {
        const appContainer = document.createElement('div');
        appContainer.id = 'app-container';
        rootElement.appendChild(appContainer);
      }
    }

    // Cleanup function to prevent memory leaks
    return () => {
      const script = document.querySelector('script:not([src])');
      if (script) script.remove();
    };
  }, []);

  return <div id="app-container" className="min-h-screen bg-background"></div>;
};

export default Home;
