fetch('/api/recipes')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Recipes:', data);

        // Recipe cards
        const recipeCards = document.querySelector('.recipe-cards');
        if (data.length > 0) {
            data.forEach(recipe => {
                const card = document.createElement('div');
                card.classList.add('review-recipe-container');
                card.innerHTML = `
                <div class="recipe-num">${recipe.recipe_id}</div>
                <div class="review-img"></div>
                <div class="selection-container">
                    <h2><a href="recipes.html?id=${recipe.recipe_id}">${recipe.title}</a></h2>
                    <p>${recipe.description || 'No description available'}</p>
                </div>
                `;
                recipeCards.appendChild(card);
            });
        }

    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
    });
