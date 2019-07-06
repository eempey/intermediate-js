import React, { Component } from 'react';
import './Recipe.css';
import PropTypes from 'prop-types';

class Recipe extends Component {
    render() {
        const { title, img, instructions } = this.props;
        const ingredients = this.props.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ));
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

Recipe.propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    instructions: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string)
};

export default Recipe;