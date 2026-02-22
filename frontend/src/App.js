import "./App.css";
import {Route, Routes} from "react-router-dom";
import ListRecipes from "./components/ListRecipes";
import EditNewRecipe from "./components/EditNewRecipe";


function App() {

     return (
    
    <div className="app">
        <Routes>
            <Route path="/" element={<ListRecipes/>}/>
            <Route path="/create_recipe" element={<EditNewRecipe/>}/>
        </Routes>
        
    </div>
     );
}


export default App;
