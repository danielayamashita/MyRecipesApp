import { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import * as RecipeAPI from "../api/RecipeAPI";
import { useNavigate } from "react-router-dom";


const EditNewRecipe = () => {

    const navigate = useNavigate();

  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");

  const getRecipe = async (query) => {
      const res = await RecipeAPI.searchRecipe(query);
      setRecipe(res);
    };


  const updateQuery = (query) => {
      setQuery(query);   
      console.log("Query:",query);  
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
                        <button onClick={() => getRecipe(query)}>Search</button>
                                              
                    </div>
                    <div>
                        <h1>{recipe.title}</h1>

                        {recipe.image_url && (
                            <img src={recipe.image_url} alt="Recipe" className="recipe-image" 
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            />
                        )}
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

                    <button  onClick={async () => {
                        await RecipeAPI.saveRecipe(recipe);
                        navigate("/");
                    }}>
                        Save Recipe
                    </button>
                   
                </div>
            </div>
    
         );


}

export default EditNewRecipe;