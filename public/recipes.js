// recipe ID from URL
const urlParams = new URLSearchParams(window.location.search);
let recipeId = parseInt(urlParams.get("id")); // Convert recipeId to an integer

// Fetch the recipe data and render the details
fetch('/api/recipes')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            // Render the initial recipe based on the recipeId from the URL
            const recipe = data[recipeId - 1];
            renderRecipeDetails(recipe);

            // Next button functionality
            const nextButton = document.getElementById('next-button');
            nextButton.addEventListener('click', () => {
                if (recipeId < data.length) {
                    recipeId += 1;
                    const nextRecipe = data[recipeId - 1];
                    renderRecipeDetails(nextRecipe);

                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set("id", recipeId);
                    window.history.pushState({}, '', newUrl);
                }

                // Update Next button visibility after changing the recipe
                nextButton.style.display = recipeId === data.length ? 'none' : 'block';
            });

            // Back button functionality
            const backButton = document.getElementById('back-button');
            backButton.addEventListener('click', () => {
                if (recipeId > 1) {
                    recipeId -= 1; // Go back to the previous recipe
                    const previousRecipe = data[recipeId - 1];
                    renderRecipeDetails(previousRecipe);

                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set("id", recipeId);
                    window.history.pushState({}, '', newUrl);
                } else {
                    // Handle case when recipeId is 1 (no previous recipe)
                    document.querySelector('.title-container').innerHTML = '<h1 class="recipe-title">No recipes found</h1>';
                    document.querySelector('.ingredients-list').innerHTML = '<p>No ingredients found</p>';
                    document.querySelector('.instructionContainer').innerHTML = '<p>No instructions found</p>';
                }
            });
        }
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });

// Function to render the recipe details (title, ingredients, instructions)
function renderRecipeDetails(recipe) {
    renderRecipeTitle(recipe);
    renderIngredients(recipe);
    renderInstructions(recipe);
}

// Function to render the recipe title
function renderRecipeTitle(recipe) {
    const recipeTitle = document.querySelector('.title-container');
    recipeTitle.innerHTML = `<h1 class="recipe-title">${recipe.title}</h1>`;
}

// Function to render the ingredients list
function renderIngredients(recipe) {
    const ingredientsList = document.querySelector('.ingredients-list');
    ingredientsList.innerHTML = ''; // Clear existing content
    
    if (recipe.ingredients?.length > 0) {
        const ul = document.createElement('ul');
        ingredientsList.appendChild(ul);

        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
            ul.appendChild(li);
        });
    } else {
        ingredientsList.innerHTML = '<p>No ingredients found</p>';
    }
}

// Function to render recipe instructions
function renderInstructions(recipe) {
    const recipeInstructionContainer = document.querySelector('.instructionContainer');
    recipeInstructionContainer.innerHTML = ''; // Clear existing instructions

    if (recipe.steps?.length > 0) {
        // Sort the steps by step_number
        const sortedSteps = recipe.steps.sort((a, b) => a.step_number - b.step_number);

        sortedSteps.forEach(step => {
            const instructionStep = document.createElement('div');
            instructionStep.classList.add('instructions-step');

            const stepNumber = document.createElement('div');
            stepNumber.classList.add('step-number');
            stepNumber.textContent = `Step ${step.step_number}`;
            instructionStep.appendChild(stepNumber);

            const p = document.createElement('p');
            p.classList.add('step-text');
            p.textContent = step.description;
            instructionStep.appendChild(p);

            recipeInstructionContainer.appendChild(instructionStep);
        });
    } else {
        recipeInstructionContainer.innerHTML = '<p>No instructions found</p>';
    }
}
