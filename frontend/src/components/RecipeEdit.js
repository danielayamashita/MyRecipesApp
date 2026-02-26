
import PropTypes from "prop-types";
import * as RecipeAPI from "../api/RecipeAPI";

const RecipeEdit = ({recipe,handleOptionChange}) => {

    return (
        <div className="recipe-edit" >
            <select onChange={(event) => handleOptionChange(event, recipe)}>
                <option value="select">Select an action:</option>
                <option value="delete">Delete</option>
                <option value="edit">Edit</option>
            </select>
        </div>
    );

}

export default RecipeEdit;


RecipeEdit.propTypes = {
    recipe: PropTypes.object.isRequired,
    handleOptionChange: PropTypes.func.isRequired
  };
  