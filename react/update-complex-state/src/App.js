import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };
  }
  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
        <li key={index}>
          <h3>{instructor.name}</h3>
          <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
        </li>
    ));

    setTimeout(()=>{
      const randomIndex = Math.floor(Math.random()*this.state.instructors.length);
      const hobbyIndex = Math.floor(Math.random()*this.state.instructors[randomIndex].hobbies.length);
      const instructors = this.state.instructors.map((instructor, index) => {
          if (index === randomIndex) {
              const hobbies = [...instructor.hobbies];
              hobbies.splice(hobbyIndex, 1);
              return {
                  ...instructor,
                  hobbies
              }
          }
            return instructor;
      });

      this.setState({instructors});
        console.log(instructors);
    }, 5000);

    return (
        <div className="App">
          <ul>
            {instructors}
          </ul>
        </div>
    );
  }
}

export default App;
