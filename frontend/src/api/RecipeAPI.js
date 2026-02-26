const api_url = "http://127.0.0.1:8000/api";



export const saveRecipe = async (recipeData) => {

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

export const searchRecipe = async (query) => {
  try {
    const response = await fetch(`${api_url}/recipe_marmiton/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ query }) // query is sent as JSON
                        });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Search failed:", error);
    throw error;
  }
};



/*export const searchRecipe = async (query) => {
  try {
    const response = await fetch(`${api_url}/recipe_marmiton/?q=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Search failed:", error);
    throw error;
  }
};
*/

/*export const searchRecipe = (query) =>
    fetch(`${api_url}/recipe_marmiton/?q=${query}`)
    .then((res) => res.json());
    */


export const fetchRecipes = async () => 
      fetch(`${api_url}/recipes/all/`)
      .then((res) => res.json());



export const deleteRecipe = async (id) => {
  try {
    await fetch(`${api_url}/recipes/${id}/delete/`, {
      method: "DELETE",
    });
    console.log("Recipe deleted successfully");
  } catch (error) {
    console.error("Error deleting:", error);
  }
};