import Recipe from "./Recipe";
import AddNewRecipe from "./AddNewRecipe";
import PropTypes from "prop-types";

const ListRecipes = () => { 

  return (
    <div  className="recipe-grid">
      <Recipe/>
      <AddNewRecipe/>
    </div>
  );
};

export default ListRecipes;


