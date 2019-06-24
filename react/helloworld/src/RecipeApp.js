import React, { Component } from 'react';
import logo from './logo.svg';
import Recipe from './Recipe';
import './RecipeApp.css';

class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Recipes</h2>
        </div>
          <Recipe
            title="Pasta"
            ingredients={['flour', 'water']}
            instructions="Mix ingredients"
            img="spaghetti.jpg"
          />
      </div>
    );
  }
}

export default RecipeApp;
