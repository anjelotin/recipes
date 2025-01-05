const express = require('express');
const path = require('path');
const recipesRoutes = require('./api/routes/recipes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/recipes', recipesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});