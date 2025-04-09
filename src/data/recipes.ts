
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  categories: string[];
  nutrients?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const recipeCategories = [
  'All',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb',
  'High-Protein',
  'Quick Meals',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack'
];

export const initialRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Avocado Toast with Poached Egg',
    description: 'Creamy avocado on toasted bread topped with a perfectly poached egg.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '1 ripe avocado',
      '2 slices of whole grain bread',
      '2 eggs',
      '1 tbsp white vinegar',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)',
      'Fresh herbs like cilantro or parsley (optional)'
    ],
    instructions: [
      'Toast the bread slices until golden and firm.',
      'While the bread is toasting, halve the avocado, remove the pit, and scoop the flesh into a bowl.',
      'Mash the avocado with a fork and season with salt and pepper.',
      'For the poached eggs, bring a pot of water to a simmer and add the vinegar.',
      'Create a gentle whirlpool in the water and crack an egg into the center.',
      'Cook for about 3 minutes or until the whites are set but the yolk is still runny.',
      'Spread the mashed avocado on the toast and top with the poached egg.',
      'Season with salt, pepper, red pepper flakes, and fresh herbs as desired.'
    ],
    categories: ['Vegetarian', 'Breakfast', 'High-Protein'],
    nutrients: {
      calories: 350,
      protein: 15,
      carbs: 30,
      fat: 20
    }
  },
  {
    id: '2',
    name: 'Quinoa Buddha Bowl',
    description: 'A nutritious bowl packed with quinoa, roasted vegetables, and a tahini dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-5ec6a79120b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups water or vegetable broth',
      '1 sweet potato, diced',
      '1 red bell pepper, sliced',
      '1 zucchini, sliced',
      '1 cup chickpeas, drained and rinsed',
      '2 tbsp olive oil',
      '2 tsp cumin',
      '1 tsp paprika',
      'Salt and pepper to taste',
      'For the dressing: 2 tbsp tahini, 1 tbsp lemon juice, 1 garlic clove (minced), water as needed, salt to taste',
      'Toppings: avocado slices, fresh herbs, seeds'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Cook quinoa according to package instructions using water or broth.',
      'Toss sweet potato, bell pepper, zucchini, and chickpeas with olive oil, cumin, paprika, salt, and pepper.',
      'Spread vegetables on a baking sheet and roast for 20-25 minutes until tender and slightly crispy.',
      'Make the dressing by whisking together tahini, lemon juice, garlic, and enough water to reach desired consistency. Season with salt.',
      'Assemble bowls with quinoa as the base, roasted vegetables and chickpeas on top.',
      'Drizzle with tahini dressing and add toppings like avocado, fresh herbs, and seeds.'
    ],
    categories: ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Lunch', 'Dinner'],
    nutrients: {
      calories: 450,
      protein: 18,
      carbs: 60,
      fat: 15
    }
  },
  {
    id: '3',
    name: 'Lemon Garlic Butter Salmon',
    description: 'Tender salmon fillets cooked in a delicious lemon garlic butter sauce.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '4 salmon fillets (about 6 oz each)',
      '4 tbsp butter',
      '4 cloves garlic, minced',
      '1 lemon, juiced and zested',
      '2 tbsp fresh dill or parsley, chopped',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Pat salmon fillets dry and season with salt and pepper.',
      'In a large skillet over medium-high heat, melt 2 tablespoons of butter.',
      'Place salmon in the skillet skin-side down and cook for 5 minutes.',
      'Flip the salmon and cook for another 2 minutes.',
      'Remove salmon from the pan and set aside.',
      'In the same pan, add remaining butter, garlic, lemon juice, and zest. Stir for 1-2 minutes until fragrant.',
      'Return salmon to the pan, spoon the sauce over it, and cook for another minute.',
      'Garnish with fresh dill or parsley before serving.'
    ],
    categories: ['Gluten-Free', 'Low-Carb', 'High-Protein', 'Dinner', 'Quick Meals'],
    nutrients: {
      calories: 380,
      protein: 34,
      carbs: 2,
      fat: 26
    }
  },
  {
    id: '4',
    name: 'Chocolate Avocado Mousse',
    description: 'A healthier dessert option made with avocados, cocoa powder, and natural sweeteners.',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '2 ripe avocados',
      '1/2 cup unsweetened cocoa powder',
      '1/3 cup maple syrup or honey',
      '1/4 cup almond milk',
      '1 tsp vanilla extract',
      'Pinch of salt',
      'Fresh berries for topping (optional)'
    ],
    instructions: [
      'Cut avocados in half, remove pits, and scoop flesh into a food processor or blender.',
      'Add cocoa powder, maple syrup or honey, almond milk, vanilla extract, and salt.',
      'Blend until smooth and creamy, scraping down the sides as needed.',
      'Taste and adjust sweetness if necessary.',
      'Transfer to serving cups and refrigerate for at least 1 hour to set.',
      'Top with fresh berries before serving if desired.'
    ],
    categories: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Dessert'],
    nutrients: {
      calories: 250,
      protein: 4,
      carbs: 25,
      fat: 18
    }
  },
  {
    id: '5',
    name: 'Cauliflower Fried Rice',
    description: 'A low-carb alternative to traditional fried rice using cauliflower rice.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '1 medium head cauliflower (or 4 cups pre-made cauliflower rice)',
      '2 tbsp sesame oil',
      '2 eggs, beaten',
      '1 small onion, diced',
      '2 carrots, diced',
      '1/2 cup frozen peas',
      '3 cloves garlic, minced',
      '1 tbsp ginger, minced',
      '3 tbsp soy sauce or tamari',
      '1 tbsp rice vinegar',
      '2 green onions, sliced',
      'Sesame seeds for garnish (optional)'
    ],
    instructions: [
      'If using whole cauliflower, pulse florets in a food processor until they resemble rice grains.',
      'Heat 1 tablespoon of sesame oil in a large skillet or wok over medium-high heat.',
      'Add beaten eggs and cook, stirring occasionally, until scrambled. Remove and set aside.',
      'Add remaining oil to the pan. Add onion, carrots, and garlic, and cook for 3-4 minutes until softened.',
      'Add cauliflower rice, peas, and ginger. Cook for about 5 minutes until cauliflower is tender but not mushy.',
      'Stir in soy sauce and rice vinegar. Mix well.',
      'Add the scrambled eggs back to the pan and mix to combine.',
      'Garnish with sliced green onions and sesame seeds before serving.'
    ],
    categories: ['Vegetarian', 'Gluten-Free', 'Low-Carb', 'Quick Meals', 'Dinner'],
    nutrients: {
      calories: 180,
      protein: 8,
      carbs: 15,
      fat: 10
    }
  },
  {
    id: '6',
    name: 'Mediterranean Chickpea Salad',
    description: 'A refreshing chickpea salad with cucumber, tomato, feta, and herbs in a lemon dressing.',
    image: 'https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '2 (15 oz) cans chickpeas, drained and rinsed',
      '1 English cucumber, diced',
      '2 cups cherry tomatoes, halved',
      '1/2 red onion, finely diced',
      '1/2 cup Kalamata olives, pitted and halved',
      '1/2 cup feta cheese, crumbled',
      '1/4 cup fresh parsley, chopped',
      '1/4 cup fresh mint, chopped',
      '1/4 cup olive oil',
      '3 tbsp lemon juice',
      '1 clove garlic, minced',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large bowl, combine chickpeas, cucumber, cherry tomatoes, red onion, olives, feta cheese, parsley, and mint.',
      'In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.',
      'Pour the dressing over the salad and toss gently to combine.',
      'Let sit for at least 10 minutes before serving to allow flavors to meld.',
      'Serve chilled or at room temperature.'
    ],
    categories: ['Vegetarian', 'Gluten-Free', 'High-Protein', 'Lunch', 'Quick Meals'],
    nutrients: {
      calories: 320,
      protein: 12,
      carbs: 35,
      fat: 15
    }
  },
  {
    id: '7',
    name: 'Sweet Potato Black Bean Chili',
    description: 'A hearty vegetarian chili with sweet potatoes and black beans.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: 'Medium',
    ingredients: [
      '2 tbsp olive oil',
      '1 large onion, diced',
      '1 red bell pepper, diced',
      '3 cloves garlic, minced',
      '2 medium sweet potatoes, peeled and diced',
      '2 tbsp chili powder',
      '1 tbsp cumin',
      '1 tsp oregano',
      '1/4 tsp cayenne pepper (adjust to taste)',
      '2 (15 oz) cans black beans, drained and rinsed',
      '1 (28 oz) can diced tomatoes',
      '2 cups vegetable broth',
      'Salt and pepper to taste',
      'Optional toppings: avocado, cilantro, sour cream or Greek yogurt, lime wedges, shredded cheese'
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion and bell pepper, cook for 5 minutes until softened.',
      'Add garlic and cook for another minute until fragrant.',
      'Stir in sweet potatoes, chili powder, cumin, oregano, and cayenne pepper. Cook for 2 minutes.',
      'Add black beans, diced tomatoes, and vegetable broth. Stir to combine.',
      'Bring to a boil, then reduce heat to low and simmer for about 30-40 minutes until sweet potatoes are tender and chili has thickened.',
      'Season with salt and pepper to taste.',
      'Serve hot with your choice of toppings.'
    ],
    categories: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Dinner'],
    nutrients: {
      calories: 290,
      protein: 13,
      carbs: 50,
      fat: 6
    }
  },
  {
    id: '8',
    name: 'Banana Oat Pancakes',
    description: 'Fluffy pancakes made with oats and bananas, naturally sweetened and gluten-free.',
    image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '2 ripe bananas',
      '2 eggs',
      '1 cup rolled oats (certified gluten-free if necessary)',
      '1/4 cup milk of choice (dairy or plant-based)',
      '1/2 tsp vanilla extract',
      '1/2 tsp baking powder',
      '1/4 tsp cinnamon',
      'Pinch of salt',
      'Oil or butter for cooking',
      'Optional toppings: fresh fruit, maple syrup, nut butter, yogurt'
    ],
    instructions: [
      'In a blender, combine bananas, eggs, oats, milk, vanilla, baking powder, cinnamon, and salt. Blend until smooth.',
      'Let the batter rest for 5 minutes to thicken.',
      'Heat a non-stick pan or griddle over medium heat and add a small amount of oil or butter.',
      'Pour about 1/4 cup of batter for each pancake and cook until bubbles form on the surface, about 2-3 minutes.',
      'Flip and cook for another 2 minutes or until golden brown and cooked through.',
      'Serve warm with your choice of toppings.'
    ],
    categories: ['Vegetarian', 'Gluten-Free', 'Breakfast'],
    nutrients: {
      calories: 330,
      protein: 14,
      carbs: 55,
      fat: 8
    }
  },
  {
    id: '9',
    name: 'Greek Chicken Souvlaki',
    description: 'Marinated grilled chicken skewers served with tzatziki sauce and pita bread.',
    image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '2 lbs boneless chicken breasts or thighs, cut into 1-inch cubes',
      '1/4 cup olive oil',
      '3 tbsp lemon juice',
      '4 cloves garlic, minced',
      '2 tbsp dried oregano',
      '1 tsp dried thyme',
      '1 tsp paprika',
      'Salt and pepper to taste',
      'Wooden skewers, soaked in water for 30 minutes',
      'For tzatziki: 1 cup Greek yogurt, 1 cucumber (grated), 2 cloves garlic (minced), 1 tbsp olive oil, 1 tbsp lemon juice, salt, and dill',
      'To serve: pita bread, sliced tomatoes, sliced cucumbers, sliced red onion'
    ],
    instructions: [
      'In a large bowl, whisk together olive oil, lemon juice, garlic, oregano, thyme, paprika, salt, and pepper.',
      'Add chicken pieces to the marinade and toss to coat. Cover and refrigerate for at least 2 hours, preferably overnight.',
      'Make the tzatziki sauce: Squeeze grated cucumber in a clean cloth to remove excess water. Mix with Greek yogurt, garlic, olive oil, lemon juice, salt, and dill. Refrigerate until ready to serve.',
      'Preheat grill to medium-high heat.',
      'Thread marinated chicken onto the soaked skewers.',
      'Grill for 12-15 minutes, turning occasionally, until chicken is cooked through and slightly charred.',
      'Warm pita bread on the grill for about 30 seconds per side.',
      'Serve chicken skewers with tzatziki sauce, warm pita bread, and sliced vegetables.'
    ],
    categories: ['High-Protein', 'Dinner'],
    nutrients: {
      calories: 420,
      protein: 45,
      carbs: 15,
      fat: 18
    }
  },
  {
    id: '10',
    name: 'Spinach and Mushroom Frittata',
    description: 'An easy, protein-packed egg dish with spinach and mushrooms.',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '8 large eggs',
      '1/4 cup milk',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '2 cups mushrooms, sliced',
      '3 cups fresh spinach',
      '2 cloves garlic, minced',
      '1/2 cup feta cheese, crumbled',
      '2 tbsp fresh herbs (parsley, dill, or chives), chopped',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, whisk together eggs, milk, salt, and pepper. Set aside.',
      'Heat olive oil in a 10-inch oven-safe skillet over medium heat.',
      'Add onion and cook until softened, about 3 minutes.',
      'Add mushrooms and cook until they release their moisture and begin to brown, about 5 minutes.',
      'Add garlic and spinach, cook until spinach wilts, about 2 minutes.',
      'Spread the vegetables evenly in the skillet and pour the egg mixture over them.',
      'Sprinkle feta cheese and herbs on top.',
      'Cook on the stove for 2-3 minutes until the edges begin to set.',
      'Transfer the skillet to the oven and bake for 15-18 minutes until the eggs are set and the top is slightly golden.',
      'Let cool for 5 minutes before slicing and serving.'
    ],
    categories: ['Vegetarian', 'Gluten-Free', 'Low-Carb', 'High-Protein', 'Breakfast', 'Quick Meals'],
    nutrients: {
      calories: 240,
      protein: 18,
      carbs: 5,
      fat: 17
    }
  },
  {
    id: '11',
    name: 'Coconut Curry Lentil Soup',
    description: 'A warming soup with red lentils, vegetables, and aromatic spices in a coconut broth.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    difficulty: 'Easy',
    ingredients: [
      '2 tbsp coconut oil',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp ginger, minced',
      '1 red bell pepper, diced',
      '2 carrots, diced',
      '2 tbsp curry powder',
      '1 tsp ground turmeric',
      '1/4 tsp red pepper flakes (adjust to taste)',
      '1 cup red lentils, rinsed',
      '4 cups vegetable broth',
      '1 (14 oz) can coconut milk',
      '2 cups spinach, chopped',
      'Juice of 1 lime',
      'Salt and pepper to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat coconut oil in a large pot over medium heat.',
      'Add onion, garlic, and ginger. Sauté for 3-4 minutes until softened.',
      'Add bell pepper and carrots. Cook for another 3-4 minutes.',
      'Stir in curry powder, turmeric, and red pepper flakes. Cook for 1 minute until fragrant.',
      'Add lentils and vegetable broth. Bring to a boil, then reduce heat and simmer for about 20 minutes until lentils are tender.',
      'Stir in coconut milk and spinach. Cook for another 5 minutes until spinach is wilted.',
      'Add lime juice, salt, and pepper to taste.',
      'Serve hot, garnished with fresh cilantro.'
    ],
    categories: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Lunch', 'Dinner'],
    nutrients: {
      calories: 310,
      protein: 12,
      carbs: 32,
      fat: 16
    }
  },
  {
    id: '12',
    name: 'Berry Protein Smoothie Bowl',
    description: 'A thick smoothie bowl packed with berries and topped with granola and fresh fruit.',
    image: 'https://images.unsplash.com/photo-1617301772612-2a0f5084fa5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '1 cup frozen mixed berries (strawberries, blueberries, raspberries)',
      '1 frozen banana',
      '1 scoop protein powder of choice (about 20g)',
      '1/4 cup Greek yogurt (or dairy-free alternative)',
      '1/4 cup milk of choice (dairy or plant-based)',
      'Toppings: 2 tbsp granola, 1 tbsp chia seeds, fresh berries, sliced banana, 1 tbsp nut butter'
    ],
    instructions: [
      'Add frozen berries, frozen banana, protein powder, yogurt, and milk to a blender.',
      'Blend until smooth and creamy. The mixture should be thick enough to eat with a spoon.',
      'If too thick, add a little more milk. If too thin, add more frozen fruit or ice.',
      'Pour into a bowl and add toppings: granola, chia seeds, fresh berries, sliced banana, and a drizzle of nut butter.',
      'Serve immediately.'
    ],
    categories: ['Vegetarian', 'High-Protein', 'Breakfast', 'Snack'],
    nutrients: {
      calories: 350,
      protein: 25,
      carbs: 45,
      fat: 8
    }
  },
  {
    id: '13',
    name: 'Sheet Pan Chicken Fajitas',
    description: 'Easy one-pan chicken fajitas with bell peppers and onions.',
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1161&q=80',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '1.5 lbs boneless, skinless chicken breasts, sliced into strips',
      '3 bell peppers (different colors), sliced',
      '1 large red onion, sliced',
      '3 tbsp olive oil',
      '2 tsp chili powder',
      '1 tsp cumin',
      '1 tsp paprika',
      '1/2 tsp garlic powder',
      '1/2 tsp oregano',
      'Salt and pepper to taste',
      'Juice of 1 lime',
      '8-10 small tortillas (corn or flour)',
      'Optional toppings: sour cream, guacamole, salsa, cilantro, lime wedges'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'In a small bowl, mix chili powder, cumin, paprika, garlic powder, oregano, salt, and pepper.',
      'Place sliced chicken, bell peppers, and onions on a large baking sheet.',
      'Drizzle with olive oil and sprinkle with the spice mixture. Toss to coat evenly.',
      'Spread everything in a single layer on the baking sheet.',
      'Bake for 20-25 minutes, stirring once halfway through, until chicken is cooked through and vegetables are tender and slightly charred.',
      'Squeeze lime juice over the fajita mixture.',
      'Warm tortillas according to package instructions.',
      'Serve fajita mixture with warm tortillas and your choice of toppings.'
    ],
    categories: ['Gluten-Free', 'High-Protein', 'Quick Meals', 'Dinner'],
    nutrients: {
      calories: 380,
      protein: 35,
      carbs: 25,
      fat: 15
    }
  },
  {
    id: '14',
    name: 'Mediterranean Stuffed Peppers',
    description: 'Bell peppers stuffed with a flavorful mixture of quinoa, vegetables, and feta cheese.',
    image: 'https://images.unsplash.com/photo-1602093697647-f60b58cddfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '4 large bell peppers, any color, halved lengthwise and seeds removed',
      '1 cup quinoa, rinsed',
      '2 cups vegetable broth',
      '1 tbsp olive oil',
      '1 small onion, diced',
      '2 cloves garlic, minced',
      '1 zucchini, diced',
      '1 cup cherry tomatoes, halved',
      '1 (15 oz) can chickpeas, drained and rinsed',
      '1 tsp dried oregano',
      '1/2 tsp dried thyme',
      '1/4 cup fresh parsley, chopped',
      '1/2 cup feta cheese, crumbled',
      '1/4 cup Kalamata olives, pitted and sliced',
      'Salt and pepper to taste',
      '1/4 cup tomato sauce or marinara sauce'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Cook quinoa in vegetable broth according to package instructions. Set aside.',
      'In a large skillet, heat olive oil over medium heat. Add onion and sauté for 3 minutes.',
      'Add garlic and cook for another minute.',
      'Add zucchini and cherry tomatoes. Cook for about 5 minutes until softened.',
      'Stir in cooked quinoa, chickpeas, oregano, thyme, parsley, half of the feta cheese, olives, salt, and pepper.',
      'Place pepper halves on a baking sheet or in a baking dish.',
      'Fill each pepper half with the quinoa mixture.',
      'Spoon a little tomato sauce over each stuffed pepper.',
      'Cover with aluminum foil and bake for 25 minutes.',
      'Remove foil, sprinkle with remaining feta cheese, and bake for another 10-15 minutes until peppers are tender and cheese is golden.',
      'Serve hot, garnished with additional fresh parsley if desired.'
    ],
    categories: ['Vegetarian', 'Gluten-Free', 'High-Protein', 'Dinner'],
    nutrients: {
      calories: 350,
      protein: 14,
      carbs: 50,
      fat: 12
    }
  },
  {
    id: '15',
    name: 'Apple Cinnamon Overnight Oats',
    description: 'Creamy overnight oats flavored with apple and cinnamon, perfect for busy mornings.',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '1/2 cup rolled oats',
      '1/2 cup milk of choice (dairy or plant-based)',
      '1/4 cup Greek yogurt (or dairy-free alternative)',
      '1/2 apple, diced (plus extra slices for topping)',
      '1 tbsp maple syrup or honey',
      '1/2 tsp cinnamon',
      'Pinch of nutmeg',
      '1 tbsp chia seeds',
      'Optional toppings: chopped nuts, additional apple slices, extra cinnamon, drizzle of nut butter'
    ],
    instructions: [
      'In a jar or container with a lid, combine oats, milk, yogurt, diced apple, maple syrup or honey, cinnamon, nutmeg, and chia seeds.',
      'Stir well to combine all ingredients.',
      'Seal the container and refrigerate overnight or for at least 4 hours.',
      'In the morning, stir the oats and add a splash of milk if they are too thick.',
      'Top with additional apple slices, chopped nuts, extra cinnamon, or a drizzle of nut butter if desired.',
      'Can be eaten cold or warmed up in the microwave for about 1 minute.'
    ],
    categories: ['Vegetarian', 'Breakfast', 'Quick Meals'],
    nutrients: {
      calories: 290,
      protein: 14,
      carbs: 45,
      fat: 8
    }
  }
];
