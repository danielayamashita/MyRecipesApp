import Recipe from "./Recipe";
import AddNewRecipe from "./AddNewRecipe";
import { useEffect, useState } from "react";
import * as RecipeAPI from "../api/RecipeAPI";


const ListRecipes = () => { 

  const [recipes, setRecipes] = useState([]);

  useEffect(async() => {  
    const data = await RecipeAPI.fetchRecipes();
    setRecipes(data);
    console.log("Fetched recipes:", data);
  }, []);

  const handleOptionChange = (event,recipe) => {
    const value = event.target.value;

        if (value === "delete") {
        console.log("Delete clicked");
            // Call API to delete the recipe
            RecipeAPI.deleteRecipe(recipe.id)
            .then(async () => {
            console.log("Recipe deleted successfully");

            // Update the local state to remove the deleted recipe
            const data = await RecipeAPI.fetchRecipes();
            setRecipes(data);
            
            })
            .catch((error) => {
            console.error("Error deleting recipe:", error);
            });
        }

        if (value === "edit") {
        console.log("Edit clicked");
        }
    };
      

  return (
    <div>
      <ol   className="recipe-grid">
        {recipes.map((recipe) => (
          <li key={`recipeItem${recipe.id}`}>   
            <Recipe recipe={recipe} handleOptionChange={handleOptionChange}/>           
          </li>
        ))}     
      </ol>
      <AddNewRecipe/>
    </div>
  );
};

export default ListRecipes;


