import React from 'react';
import ReactDOM from 'react-dom';
import RecipeApp from './RecipeApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipeApp />, div);
});
