import React, { Component } from 'react';
import logo from './logo.svg';
import './RecipeApp.css';

class RecipeApp extends Component {
  render() {
    return (
      <div className="RecipeApp">
        <div className="RecipeApp-header">
          <img src={logo} className="RecipeApp-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="RecipeApp-intro">
          To get started, edit <code>src/RecipeApp.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default RecipeApp;
