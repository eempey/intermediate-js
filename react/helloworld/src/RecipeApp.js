import React, { Component } from 'react';
import logo from './logo.svg';
import Recipe from './Recipe';
import './RecipeApp.css';
import Navbar from "./Navbar";

class RecipeApp extends Component {
  render() {
    let recipeData = require('./recipes.json');
      const recipes = recipeData.map((recipe) => (
          <Recipe
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              img={recipe.image}
          />
      ));
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Recipes</h2>
        </div>
        <Navbar />
        {recipes}
      </div>
    );
  }
}

export default RecipeApp;
