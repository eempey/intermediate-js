import React, { Component } from 'react';
import './Recipe.css';

class Recipe extends Component {
    render() {
        const { title, img, instructions } = this.props;
        const ingredients = this.props.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ))
        return (
            <div className="recipe-card">
                <div className="recipe-card-img">
                    <img src={img} alt={title} />
                </div>
                <div className="recipe-card-content">
                    <h2>{this.props.title}</h2>
                    <h3>Ingredients</h3>
                    <ul>
                        {ingredients}
                    </ul>
                    <h3>Instructions</h3>
                    <p>{instructions}</p>
                </div>


            </div>

        );
    }
}

export default Recipe;