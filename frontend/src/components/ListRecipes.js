import Recipe from "./Recipe";
import AddNewRecipe from "./AddNewRecipe";
import { useEffect, useState } from "react";



const ListRecipes = () => { 

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/recipes/all/");
      const data = await response.json();
      setRecipes(data);
      console.log("Fetched recipes:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchRecipes();
}, []);

  return (
    <div>
      <ol   className="recipe-grid">
        {recipes.map((recipe) => (
          <li key={`recipeItem${recipe.id}`}>   
            <Recipe recipe={recipe}/>           
          </li>
        ))}     
      </ol>
      <AddNewRecipe/>
    </div>
  );
};

export default ListRecipes;


