import React, {useEffect, useState} from "react"; 
import Recipe from './recipe2';
import "./App.css";

const App = () => {
    const App_ID = "896c811d";
    const App_KEY = "24be476614b5c69e8974e28d5356cbbb"; 

    const [recipes, setRecipes]= useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery]= useState('Puri');

    useEffect( () => {
        getRecipes();
    }, [query]);

    const getRecipes = async () =>{
        const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_KEY}`);
        const data= await response.json();
        setRecipes(data.hits);
        console.log(data.hits);  
    };

    const updateSearch = e=>{
      setSearch(e.target.value);
      //console.log(search);
    }

    const getSearch = e=>{
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" 
                  value={search} onChange={updateSearch} />
                <button className="search-button" type="submit">
                Search
                </button>
            </form>
            <div className="recipe-description">
            {recipes.map(recipe=>(
                <Recipe 
                  title={recipe.recipe.label} 
                  calories={recipe.recipe.calories}
                  image= {recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
                />
            ))}
            </div>
        </div>
    );
};

export default App;