import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        const links = [
            {
                'title': 'New Recipe',
                'url': '/addnew'
            },
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
                        {linkList}
                    </ul>
                </div>
            </div>

        );
    }
}

export default Navbar;