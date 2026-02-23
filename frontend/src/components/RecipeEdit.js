
import PropTypes from "prop-types";

const RecipeEdit = ({recipe}) => {

    
    return (
        <div className="recipe-edit" >
            <select>
                <option value="delete">Delete</option>
                <option value="edit">Edit</option>
            </select>
        </div>
    );

}

export default RecipeEdit;


RecipeEdit.propTypes = {
    recipe: PropTypes.object.isRequired
  };
  