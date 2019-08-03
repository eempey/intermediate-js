import React, { Component } from 'react';
import logo from './logo.svg';
import Recipe from './Recipe';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';
import Navbar from "./Navbar";

class RecipeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: require('./recipes.json'),
            nextRecipeId: 3,
            showForm: false
        };

        this.handleSave = this.handleSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleSave(recipe) {
        this.setState((prevState, props) => {
            const newRecipe = {...recipe, id: this.state.nextRecipeId};
            return {
                nextRecipeId: prevState.nextRecipeId + 1,
                recipes: [...this.state.recipes, newRecipe],
                showForm: false
            }
        });
    }

    onDelete(id) {
        const recipes = this.state.recipes.filter(recipe => recipe.id !== id);
        this.setState({recipes});
    }

  render() {
      const {showForm} = this.state;
      const recipes = this.state.recipes.map((recipe) => (
          <Recipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              img={recipe.image}
              onDelete={this.onDelete}
          />
      ));
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Recipes</h2>
        </div>
        <Navbar onNewRecipe={(event) => this.setState({showForm: true})} />
          { showForm ?
              <RecipeInput
                  onSave={this.handleSave}
                  onClose={() => this.setState({showForm: false})}
              /> :
              null }
        {recipes}
      </div>
    );
  }
}

export default RecipeApp;
