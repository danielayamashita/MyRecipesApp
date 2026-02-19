import { useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const EditNewRecipe = () => {

    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");


        /*useEffect(() => {
            console.log("Fetching message from backend...");
            fetch("http://127.0.0.1:8000/api/recipe_marmiton/?q=chocolate")
            .then(response => response.json())
            .then(data => setRecipes(data.message))
            .catch(error => console.error(error));
        }, []);*/

    const updateQuery = (query) => {
        setQuery(query);   
        console.log("Query:",query);  
    };


    const searchRecipes = async () => {
  try {
    console.log("searchRecipes:", query);

    const response = await fetch(
      `http://127.0.0.1:8000/api/recipe_marmiton/?q=${query}`
    );

    const data = await response.json();

    console.log("API data:", data);

    setRecipes(data); 
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
                        <h1>{recipes.name}</h1>
                        <h2>Ingredients:</h2>
                        <ul>
                            {recipes.ingredients && recipes.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>

                        <h2>Steps:</h2>
                        <ul>
                            {recipes.steps && recipes.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
    
         );


}

export default EditNewRecipe;