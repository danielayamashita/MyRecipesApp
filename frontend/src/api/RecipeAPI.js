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

export const searchRecipe = (query) =>
    fetch(`${api_url}/recipe_marmiton/?q=${query}`)
    .then((res) => res.json());


/*
export const searchRecipes = async (query) => {


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
};*/