const pool = require('../../db/db.js');

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await pool.query(`
        SELECT 
        r.id AS recipe_id,
        r.title,
        r.description,
        json_agg(DISTINCT jsonb_build_object('name', i.name, 'quantity', i.quantity, 'unit', i.unit, 'quantity_fraction', i.quantity_fraction)) AS ingredients,
        json_agg(DISTINCT jsonb_build_object('step_number', s.step_number, 'description', s.description)) AS steps
    FROM recipes r
    LEFT JOIN ingredients i ON r.id = i.recipe_id
    LEFT JOIN steps s ON r.id = s.recipe_id
    GROUP BY r.id;
    
        `);

        if (recipes.rows.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        console.log('Recipes:', recipes.rows); // Verify the fetched data structure
        res.status(200).json(recipes.rows);
    } catch (err) {
        console.error('Database query failed:', err.stack); // Log detailed error
        res.status(500).send('Failed to fetch recipes');
    }
};

module.exports = {
    getAllRecipes,
};
