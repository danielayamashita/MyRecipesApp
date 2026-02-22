import PropTypes from "prop-types";
import myImage from "../images/feijoada.jpg";

const Recipe = ({ recipe }) => {

    return (<div className="recipe" >
          <div className="recipe-top">
            <div
              className="recipe-cover"
              style={{
                width: 150,
                height: 150,
                backgroundImage: `url(${myImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
    
          </div>
          <div className="recipe-title">{recipe.title}</div>
        </div>);


}

export default Recipe;