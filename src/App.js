import "./App.css";
import { useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Recipe from "./components/Recipe";


function App() {

     return (
    
    <div className="app">
        <Routes>
            <Route path="/" element={<Recipe/>}/>
        </Routes>
    </div>
     );
}


export default App;
