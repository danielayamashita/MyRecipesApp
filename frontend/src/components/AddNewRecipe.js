import {Link} from "react-router-dom";

const AddNewRecipe = () => {
  return (
    <div className="open-search">
      <Link className="close-search" to="/create_recipe">
      Add a recipe
      </Link>
      
    </div>
  );
};

export default AddNewRecipe;