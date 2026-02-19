const express = require("express");
const cors = require("cors");
const marmiton = require("marmiton-api");

const app = express();
app.use(cors());

app.get("/api/recipes", async (req, res) => {
  const query = req.query.q;

  console.log("Query received:", query);

  try {
    console.log("Marmiton search");
    const recipes = await marmiton.searchRecipes(query);
    
    res.json(recipes);

    console.log("Recipe:", recipes);
  } catch (error) {

    console.log("Failed to fetch recipes");
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});