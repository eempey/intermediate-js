import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Navbar.css';

class Navbar extends Component {
    static defaultProps = {
        onNewRecipe() {}
    };

    static propTypes = {
        onNewRecipe: PropTypes.func
    };
    render() {
        const {onNewRecipe} = this.props;
        const links = [
            {
                'title': 'Home',
                'url': '/home'
            },
            {
                'title': 'About',
                'url': '/about'
            },
            {
                'title': 'Contact Us',
                'url': '/contact-us'
            }
        ];
        const linkList = links.map((link, index) => (
            <li key={index}>
                <a href={link.url}>{link.title}</a>
            </li>
        ));
        return (
            <div id="nav-bar">
                <div className="title">
                    <h2>Recipe App</h2>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <a onClick={onNewRecipe}>New Recipe</a>
                        </li>
                        {linkList}
                    </ul>
                </div>
            </div>

        );
    }
}

export default Navbar;