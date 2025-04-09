
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    // Create container for our app
    const appContainer = document.createElement('div');
    appContainer.id = 'recipe-app';
    appContainer.className = 'recipe-app';
    
    // Add HTML content
    appContainer.innerHTML = `
      <header class="app-header">
        <div class="container">
          <h1>Recipe Finder</h1>
          <nav>
            <a href="#" class="active">Home</a>
            <a href="#saved">Saved Recipes</a>
            <a href="#add">Add Recipe</a>
          </nav>
        </div>
      </header>

      <main class="container">
        <section class="search-section">
          <h2>Find Your Perfect Recipe</h2>
          <div class="search-container">
            <input type="text" id="search-input" placeholder="Search recipes...">
            <button id="search-button">Search</button>
          </div>
          <div class="filter-container" id="category-filters"></div>
        </section>

        <section class="results-section">
          <div class="loading" id="loading">Loading recipes...</div>
          <div class="recipe-grid" id="recipe-container"></div>
        </section>
      </main>

      <div class="modal" id="recipe-modal">
        <div class="modal-content">
          <span class="modal-close">&times;</span>
          <div id="modal-body"></div>
        </div>
      </div>
    `;

    // Add CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      body {
        background-color: #f8f9fa;
        color: #333;
        line-height: 1.6;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
      }
      
      .recipe-app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      /* Header */
      .app-header {
        background-color: #4CAF50;
        color: white;
        padding: 1rem 0;
      }
      
      .app-header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .app-header h1 {
        margin: 0;
        font-size: 1.8rem;
      }
      
      .app-header nav {
        display: flex;
        gap: 1rem;
      }
      
      .app-header a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      
      .app-header a.active,
      .app-header a:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      /* Search Section */
      .search-section {
        text-align: center;
        padding: 2rem 0;
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
        border: 1px solid #ddd;
        border-radius: 4px 0 0 4px;
        outline: none;
      }
      
      .search-container button {
        padding: 0.75rem 1.5rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }
      
      .filter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem 0;
      }
      
      .category-btn {
        background-color: #eee;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .category-btn.active {
        background-color: #4CAF50;
        color: white;
      }
      
      /* Recipe Grid */
      .recipe-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        padding: 1rem 0;
      }
      
      .recipe-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
      }
      
      .recipe-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      
      .card-img-container {
        height: 180px;
        overflow: hidden;
        position: relative;
      }
      
      .recipe-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .card-img-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        display: flex;
        justify-content: space-between;
        color: white;
      }
      
      .recipe-card .card-content {
        padding: 1rem;
      }
      
      .recipe-card h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      
      .recipe-card p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .recipe-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
      }
      
      .category-tag {
        font-size: 0.75rem;
        background-color: #f3f3f3;
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
      }
      
      .save-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        border: none;
        cursor: pointer;
      }
      
      /* Modal */
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        overflow-y: auto;
      }
      
      .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 20px;
        width: 90%;
        max-width: 800px;
        border-radius: 8px;
        position: relative;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .modal-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
      }
      
      /* Loading */
      .loading {
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
        color: #666;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .app-header .container {
          flex-direction: column;
          gap: 1rem;
        }
        
        .recipe-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
      }
      
      @media (max-width: 480px) {
        .recipe-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    // Add JavaScript
    const scriptEl = document.createElement('script');
    scriptEl.innerHTML = `
      // API Configuration
      const API_CONFIG = {
        url: 'https://api.edamam.com/api/recipes/v2',
        type: 'public',
        appId: 'YOUR_APP_ID', // Replace with your actual API ID
        appKey: 'YOUR_APP_KEY', // Replace with your actual API Key
      };
      
      // Sample data (used if API is not configured)
      const SAMPLE_RECIPES = [
        {
          id: "recipe1",
          name: "Spaghetti Carbonara",
          description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
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
          description: "Simple and nutritious breakfast or snack with creamy avocado on toast.",
          image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=2070&auto=format&fit=crop",
          prepTime: 5,
          cookTime: 5,
          servings: 1,
          difficulty: "Easy",
          ingredients: [
            "2 slices whole grain bread",
            "1 ripe avocado",
            "2 eggs (optional)",
            "Salt and pepper to taste",
            "Red pepper flakes (optional)",
            "Fresh herbs like cilantro (optional)"
          ],
          instructions: [
            "Toast the bread until golden and firm.",
            "Optional: While the bread is toasting, fry the eggs to your preference.",
            "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
            "Mash the avocado with a fork and season with salt and pepper.",
            "Spread the mashed avocado on the toast.",
            "If using, top each toast with a fried egg.",
            "Sprinkle with additional toppings as desired."
          ],
          categories: ["Breakfast", "Vegetarian", "Quick", "Healthy"],
        },
        {
          id: "recipe3",
          name: "Chicken Curry",
          description: "Flavorful and aromatic curry with tender chicken pieces and rich spices.",
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
            "1 tsp cumin",
            "1 can (400ml) coconut milk",
            "1 cup chicken stock",
            "Fresh cilantro for garnish",
            "Salt to taste"
          ],
          instructions: [
            "Heat oil in a large pot over medium heat.",
            "Add onions and cook until soft and translucent.",
            "Add garlic and ginger, cook for another minute until fragrant.",
            "Add all the spices and cook for 30 seconds, stirring constantly.",
            "Add the chicken pieces and cook until they start to color.",
            "Pour in the coconut milk and chicken stock, bring to a simmer.",
            "Reduce heat to low and cook covered for about 30 minutes until chicken is tender.",
            "Adjust seasoning with salt.",
            "Garnish with fresh cilantro before serving."
          ],
          categories: ["Dinner", "Indian", "Spicy"],
        }
      ];
      
      // DOM Elements
      const recipeContainer = document.getElementById('recipe-container');
      const categoryFilters = document.getElementById('category-filters');
      const searchInput = document.getElementById('search-input');
      const searchButton = document.getElementById('search-button');
      const recipeModal = document.getElementById('recipe-modal');
      const modalBody = document.getElementById('modal-body');
      const modalClose = document.querySelector('.modal-close');
      const loadingIndicator = document.getElementById('loading');
      
      // App State
      let allRecipes = [];
      let filteredRecipes = [];
      let selectedCategory = 'All';
      let searchQuery = '';
      
      // Initialize app
      function initApp() {
        // Get recipes - sample or from API
        fetchRecipes();
        
        // Event listeners
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') handleSearch();
        });
        
        modalClose.addEventListener('click', closeRecipeModal);
        window.addEventListener('click', (e) => {
          if (e.target === recipeModal) closeRecipeModal();
        });
        
        // Handle navigation
        window.addEventListener('hashchange', handleNavigation);
        handleNavigation();
      }
      
      // Fetch recipes from API or use samples
      function fetchRecipes() {
        // Check if API keys are configured
        if (API_CONFIG.appId === 'YOUR_APP_ID' || API_CONFIG.appKey === 'YOUR_APP_KEY') {
          console.log('Using sample recipes (no API keys provided)');
          processRecipes(SAMPLE_RECIPES);
          return;
        }
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        // Build API URL
        const apiUrl = \`\${API_CONFIG.url}?type=\${API_CONFIG.type}&app_id=\${API_CONFIG.appId}&app_key=\${API_CONFIG.appKey}&random=true\`;
        
        // Fetch from API
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
          })
          .then(data => {
            // Transform API data to match our format
            const recipes = data.hits.map(hit => ({
              id: hit.recipe.uri.split('#')[1],
              name: hit.recipe.label,
              description: hit.recipe.source,
              image: hit.recipe.image,
              prepTime: Math.round(hit.recipe.totalTime / 2) || 15,
              cookTime: Math.round(hit.recipe.totalTime / 2) || 20,
              servings: hit.recipe.yield,
              difficulty: determineDifficulty(hit.recipe),
              ingredients: hit.recipe.ingredientLines,
              instructions: ["See full instructions at source website"],
              categories: hit.recipe.cuisineType.concat(hit.recipe.mealType, hit.recipe.dishType)
            }));
            
            processRecipes(recipes);
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
            processRecipes(SAMPLE_RECIPES);
          })
          .finally(() => {
            loadingIndicator.style.display = 'none';
          });
      }
      
      // Process fetched recipes
      function processRecipes(recipes) {
        allRecipes = recipes;
        filteredRecipes = recipes;
        
        // Extract all unique categories
        const categories = getAllCategories(recipes);
        renderCategoryFilters(categories);
        
        // Render recipes
        renderRecipeCards(filteredRecipes);
      }
      
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
          button.className = 'category-btn';
          button.textContent = category;
          
          if (category === selectedCategory) {
            button.classList.add('active');
          }
          
          button.addEventListener('click', () => {
            selectedCategory = category;
            
            // Update active button style
            document.querySelectorAll('.category-btn').forEach(btn => {
              btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filter and render recipes
            filterAndRenderRecipes();
          });
          
          categoryFilters.appendChild(button);
        });
      }
      
      // Handle search
      function handleSearch() {
        searchQuery = searchInput.value.trim().toLowerCase();
        filterAndRenderRecipes();
      }
      
      // Filter recipes based on search query and category
      function filterRecipes() {
        return allRecipes.filter(recipe => {
          const matchesCategory = selectedCategory === 'All' || recipe.categories.includes(selectedCategory);
          
          const matchesSearch = searchQuery === '' || 
            recipe.name.toLowerCase().includes(searchQuery) ||
            recipe.description.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery));
          
          return matchesCategory && matchesSearch;
        });
      }
      
      // Filter and render recipes
      function filterAndRenderRecipes() {
        filteredRecipes = filterRecipes();
        renderRecipeCards(filteredRecipes);
      }
      
      // Render recipe cards
      function renderRecipeCards(recipes) {
        recipeContainer.innerHTML = '';
        
        if (recipes.length === 0) {
          recipeContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search or category.</p>';
          return;
        }
        
        recipes.forEach(recipe => {
          const card = document.createElement('div');
          card.className = 'recipe-card';
          
          // Check if recipe is saved
          const isSaved = isRecipeSaved(recipe.id);
          
          card.innerHTML = \`
            <div class="card-img-container">
              <img src="\${recipe.image}" alt="\${recipe.name}">
              <div class="card-img-overlay">
                <span>\${recipe.prepTime + recipe.cookTime} min</span>
                <span>\${recipe.difficulty}</span>
              </div>
              <button class="save-btn" data-id="\${recipe.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="\${isSaved ? 'red' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
            <div class="card-content">
              <h3>\${recipe.name}</h3>
              <p>\${recipe.description}</p>
              <div class="recipe-categories">
                \${recipe.categories.slice(0, 3).map(cat => 
                  \`<span class="category-tag">\${cat}</span>\`
                ).join('')}
                \${recipe.categories.length > 3 ? 
                  \`<span class="category-tag">+\${recipe.categories.length - 3}</span>\` : 
                  ''}
              </div>
            </div>
          \`;
          
          // Add event listener to card
          card.addEventListener('click', (e) => {
            if (!e.target.closest('.save-btn')) {
              openRecipeModal(recipe);
            }
          });
          
          // Add event listener to save button
          const saveBtn = card.querySelector('.save-btn');
          saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSaveRecipe(recipe, saveBtn);
          });
          
          recipeContainer.appendChild(card);
        });
      }
      
      // Open recipe details modal
      function openRecipeModal(recipe) {
        modalBody.innerHTML = \`
          <div class="recipe-detail">
            <div class="recipe-detail-header">
              <img src="\${recipe.image}" alt="\${recipe.name}" class="detail-image">
              <div class="detail-info">
                <h2>\${recipe.name}</h2>
                <p>\${recipe.description}</p>
                <div class="detail-meta">
                  <div class="meta-item">
                    <strong>\${recipe.prepTime}</strong> min
                    <span>Prep Time</span>
                  </div>
                  <div class="meta-item">
                    <strong>\${recipe.cookTime}</strong> min
                    <span>Cook Time</span>
                  </div>
                  <div class="meta-item">
                    <strong>\${recipe.servings}</strong>
                    <span>Servings</span>
                  </div>
                  <div class="meta-item">
                    <strong>\${recipe.difficulty}</strong>
                    <span>Difficulty</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="recipe-detail-body">
              <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>
                  \${recipe.ingredients.map(ingredient => 
                    \`<li>\${ingredient}</li>\`
                  ).join('')}
                </ul>
              </div>
              
              <div class="instructions">
                <h3>Instructions</h3>
                <ol>
                  \${recipe.instructions.map(instruction => 
                    \`<li>\${instruction}</li>\`
                  ).join('')}
                </ol>
              </div>
            </div>
          </div>
        \`;
        
        // Add style to modal content
        const style = document.createElement('style');
        style.textContent = \`
          .recipe-detail-header {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .detail-image {
            width: 300px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
          }
          
          .detail-info h2 {
            margin-top: 0;
            margin-bottom: 10px;
          }
          
          .detail-meta {
            display: flex;
            gap: 20px;
            margin-top: 20px;
          }
          
          .meta-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .meta-item strong {
            font-size: 1.2rem;
          }
          
          .meta-item span {
            font-size: 0.8rem;
            color: #666;
          }
          
          .recipe-detail-body {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
          }
          
          .ingredients ul, .instructions ol {
            padding-left: 20px;
            line-height: 1.8;
          }
          
          .ingredients li, .instructions li {
            margin-bottom: 8px;
          }
          
          @media (max-width: 768px) {
            .recipe-detail-header {
              flex-direction: column;
            }
            
            .detail-image {
              width: 100%;
              height: auto;
            }
            
            .recipe-detail-body {
              grid-template-columns: 1fr;
            }
          }
        \`;
        
        document.head.appendChild(style);
        recipeModal.style.display = 'block';
      }
      
      // Close recipe modal
      function closeRecipeModal() {
        recipeModal.style.display = 'none';
      }
      
      // Toggle save recipe
      function toggleSaveRecipe(recipe, button) {
        const isSaved = isRecipeSaved(recipe.id);
        
        if (isSaved) {
          removeRecipeFromFavorites(recipe.id);
          button.querySelector('svg').setAttribute('fill', 'none');
          showToast('Recipe removed from favorites');
        } else {
          saveRecipeToFavorites(recipe);
          button.querySelector('svg').setAttribute('fill', 'red');
          showToast('Recipe saved to favorites');
        }
      }
      
      // Show toast notification
      function showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'toast';
          document.body.appendChild(toast);
          
          // Add toast style
          const style = document.createElement('style');
          style.textContent = \`
            #toast {
              position: fixed;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              background-color: #333;
              color: white;
              padding: 12px 24px;
              border-radius: 4px;
              z-index: 1001;
              opacity: 0;
              transition: opacity 0.3s;
            }
            
            #toast.show {
              opacity: 1;
            }
          \`;
          document.head.appendChild(style);
        }
        
        // Set message and show
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }
      
      // Handle navigation based on hash
      function handleNavigation() {
        const hash = window.location.hash || '#home';
        
        // Update active navigation link
        document.querySelectorAll('header nav a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === hash || 
              (hash === '#home' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
          }
        });
        
        // Show appropriate content based on hash
        switch (hash) {
          case '#saved':
            showSavedRecipes();
            break;
          case '#add':
            showAddRecipeForm();
            break;
          default:
            // Home is already shown
            break;
        }
      }
      
      // Show saved recipes page
      function showSavedRecipes() {
        const savedRecipes = getSavedRecipesFromLocalStorage();
        const mainContent = document.querySelector('main');
        
        mainContent.innerHTML = \`
          <section class="container saved-recipes">
            <h2>Your Saved Recipes</h2>
            <div class="recipe-grid" id="saved-container">
              \${savedRecipes.length ? '' : '<p class="no-saved">You have no saved recipes yet. Browse recipes and click the heart icon to save them.</p>'}
            </div>
          </section>
        \`;
        
        const savedContainer = document.getElementById('saved-container');
        
        if (savedRecipes.length > 0) {
          renderRecipeCards(savedRecipes);
        }
      }
      
      // Show add recipe form
      function showAddRecipeForm() {
        const mainContent = document.querySelector('main');
        
        mainContent.innerHTML = \`
          <section class="container add-recipe">
            <h2>Add Your Recipe</h2>
            <form id="recipe-form">
              <div class="form-group">
                <label for="recipe-name">Recipe Name</label>
                <input type="text" id="recipe-name" required>
              </div>
              
              <div class="form-group">
                <label for="recipe-description">Description</label>
                <textarea id="recipe-description" required></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="prep-time">Prep Time (minutes)</label>
                  <input type="number" id="prep-time" min="0" required>
                </div>
                
                <div class="form-group">
                  <label for="cook-time">Cook Time (minutes)</label>
                  <input type="number" id="cook-time" min="0" required>
                </div>
                
                <div class="form-group">
                  <label for="servings">Servings</label>
                  <input type="number" id="servings" min="1" required>
                </div>
              </div>
              
              <div class="form-group">
                <label for="difficulty">Difficulty</label>
                <select id="difficulty" required>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="image-url">Image URL</label>
                <input type="url" id="image-url" required>
                <span class="form-hint">Enter a URL for your recipe image</span>
              </div>
              
              <div class="form-group">
                <label for="categories">Categories (comma-separated)</label>
                <input type="text" id="categories" required>
                <span class="form-hint">E.g., Dinner, Italian, Pasta</span>
              </div>
              
              <div class="form-group">
                <label for="ingredients">Ingredients (one per line)</label>
                <textarea id="ingredients" required></textarea>
              </div>
              
              <div class="form-group">
                <label for="instructions">Instructions (one step per line)</label>
                <textarea id="instructions" required></textarea>
              </div>
              
              <button type="submit" class="submit-btn">Add Recipe</button>
            </form>
          </section>
        \`;
        
        // Add style for form
        const style = document.createElement('style');
        style.textContent = \`
          .add-recipe {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px 0;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-row {
            display: flex;
            gap: 20px;
          }
          
          @media (max-width: 768px) {
            .form-row {
              flex-direction: column;
              gap: 10px;
            }
          }
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          input, textarea, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
          }
          
          textarea {
            min-height: 100px;
          }
          
          .form-hint {
            display: block;
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
          }
          
          .submit-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .submit-btn:hover {
            background-color: #388E3C;
          }
        \`;
        document.head.appendChild(style);
        
        // Add form submission handler
        document.getElementById('recipe-form').addEventListener('submit', (e) => {
          e.preventDefault();
          saveUserRecipe();
        });
      }
      
      // Save user-submitted recipe
      function saveUserRecipe() {
        const recipe = {
          name: document.getElementById('recipe-name').value,
          description: document.getElementById('recipe-description').value,
          prepTime: parseInt(document.getElementById('prep-time').value),
          cookTime: parseInt(document.getElementById('cook-time').value),
          servings: parseInt(document.getElementById('servings').value),
          difficulty: document.getElementById('difficulty').value,
          image: document.getElementById('image-url').value,
          categories: document.getElementById('categories').value.split(',').map(c => c.trim()),
          ingredients: document.getElementById('ingredients').value.split('\\n').filter(line => line.trim()),
          instructions: document.getElementById('instructions').value.split('\\n').filter(line => line.trim())
        };
        
        // Save to local storage
        const savedRecipe = saveUserRecipeToLocalStorage(recipe);
        
        showToast('Recipe added successfully!');
        
        // Reset form
        document.getElementById('recipe-form').reset();
        
        // Optionally, redirect to home after a delay
        setTimeout(() => {
          window.location.hash = '';
        }, 2000);
      }
      
      // Local Storage Functions
      
      function getSavedRecipesFromLocalStorage() {
        const savedRecipes = localStorage.getItem('saved_recipes');
        return savedRecipes ? JSON.parse(savedRecipes) : [];
      }
      
      function saveRecipeToFavorites(recipe) {
        const savedRecipes = getSavedRecipesFromLocalStorage();
        
        if (!savedRecipes.some(item => item.id === recipe.id)) {
          savedRecipes.push(recipe);
          localStorage.setItem('saved_recipes', JSON.stringify(savedRecipes));
        }
      }
      
      function removeRecipeFromFavorites(recipeId) {
        const savedRecipes = getSavedRecipesFromLocalStorage();
        const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
        localStorage.setItem('saved_recipes', JSON.stringify(updatedRecipes));
      }
      
      function isRecipeSaved(recipeId) {
        const savedRecipes = getSavedRecipesFromLocalStorage();
        return savedRecipes.some(recipe => recipe.id === recipeId);
      }
      
      function getUserRecipesFromLocalStorage() {
        const userRecipes = localStorage.getItem('user_recipes');
        return userRecipes ? JSON.parse(userRecipes) : [];
      }
      
      function saveUserRecipeToLocalStorage(recipe) {
        const userRecipes = getUserRecipesFromLocalStorage();
        
        const newRecipe = {
          ...recipe,
          id: \`user-\${Date.now()}-\${Math.floor(Math.random() * 10000)}\`,
        };
        
        userRecipes.push(newRecipe);
        localStorage.setItem('user_recipes', JSON.stringify(userRecipes));
        
        // Also add to all recipes
        allRecipes.push(newRecipe);
        
        return newRecipe;
      }
      
      // Utility functions
      
      function determineDifficulty(recipe) {
        const ingredients = recipe.ingredients ? recipe.ingredients.length : 0;
        const time = recipe.totalTime || 0;
        
        if (ingredients > 10 || time > 60) return "Hard";
        if (ingredients > 5 || time > 30) return "Medium";
        return "Easy";
      }
      
      // Start the app
      initApp();
    `;
    
    // Append to document
    document.head.appendChild(styleEl);
    document.body.appendChild(scriptEl);
    
    // Create app container div if it doesn't exist
    if (!document.getElementById('recipe-app')) {
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.appendChild(appContainer);
      } else {
        document.body.appendChild(appContainer);
      }
    }

    // Cleanup function to prevent memory leaks
    return () => {
      const styles = document.querySelectorAll('style:not([data-original])');
      styles.forEach(style => style.remove());
      const scripts = document.querySelectorAll('script:not([src])');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return <div id="root" className="min-h-screen" />;
};

export default Home;
