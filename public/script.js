fetch('/api/recipes')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Recipes:', data);

        // Recipe title
        const recipeTitle = document.querySelector('.title-container');
        if (data.length > 0) {
            recipeTitle.innerHTML = `<h1 class="recipe-title">${data[0].title}</h1>`;
        } else {
            recipeTitle.innerHTML = '<h1 class="recipe-title">No recipes found</h1>';
        }

        // Ingredients list
        const ingredientsList = document.querySelector('.ingredients-list');
        if (data.length > 0 && data[0].ingredients?.length > 0) {
            const ul = document.createElement('ul');
            ingredientsList.appendChild(ul);

            // Iterate over ingredients
            data[0].ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`;
                ul.appendChild(li);
            });
        } else {
            ingredientsList.innerHTML = '<p>No ingredients found</p>';
        }

        // Recipe instructions
        const recipeInstructionContainer = document.querySelector('.instructionContainer');
        recipeInstructionContainer.innerHTML = ''; // Clear existing instructions

        if (data.length > 0 && data[0].steps?.length > 0) {
            // Sort the steps by step_number
            const sortedSteps = data[0].steps.sort((a, b) => a.step_number - b.step_number);

            // Iterate over sorted instructions
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
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });
