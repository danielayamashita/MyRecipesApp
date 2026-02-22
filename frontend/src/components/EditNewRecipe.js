import { useState, useEffect} from "react";
import {Link} from "react-router-dom";

const api_url = "http://127.0.0.1:8000/api";


const saveRecipe = async (recipeData) => {

  try {
    console.log("Save Recipe clicked");
    const response = await fetch(`${api_url}/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const data = await response.json();
    console.log("Saved:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};


const EditNewRecipe = () => {

    const [recipe, setRecipe] = useState([]);
    const [query, setQuery] = useState("");


    const updateQuery = (query) => {
        setQuery(query);   
        console.log("Query:",query);  
    };


    const searchRecipes = async () => {
  try {
    console.log("searchRecipes:", query);

    const response = await fetch(
      `${api_url}/recipe_marmiton/?q=${query}`
    );

    const data = await response.json();

    console.log("API data:", data);

    setRecipe(data); 
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};


    return (<div >
                
                <div className="search-recipes">
                    <div className="search-recipes-bar">
                        <Link className="close-search" to="/">
                        Close
                        </Link>
                
                        <div className="search-recipes-input-wrapper">
                        <input
                            type="text"
                            placeholder="Url of the recipe on Marmiton"
                            value={query}
                            onChange={(event) => updateQuery(event.target.value)}
                        />
                        </div>
                        <button onClick={searchRecipes}>Search</button>

                        
                    </div>
                    <div>
                        <h1>{recipe.title}</h1>
                        {recipe.ingredients && recipe.ingredients.length > 0 && (
                            <h2>Ingredients:</h2>
                        )
                        }
                        
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>

                        {recipe.steps && recipe.steps.length > 0 && (
                            <h2>Steps:</h2>
                        )
                        }

                        <ul>
                            {recipe.steps && recipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={() => saveRecipe(recipe)}>Save Recipe</button>

                </div>
            </div>
    
         );


}

export default EditNewRecipe;