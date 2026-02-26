
import myImage from "../images/feijoada.jpg";
import RecipeEdit from "./RecipeEdit";

const Recipe = ({ recipe,handleOptionChange}) => {

    return (<div className="recipe" >
          <div className="recipe-top">
            <img
            src={recipe.image}
              className="recipe-cover"
              style={{
                width: 150,
                height: 150,
              }}
            />

            <RecipeEdit recipe={recipe} handleOptionChange={handleOptionChange}/>

    
          </div>
          <div className="recipe-title">{recipe.title}</div>
        </div>);


}

export default Recipe;