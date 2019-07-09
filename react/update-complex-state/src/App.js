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
      let randomIndex = Math.floor(Math.random()*this.state.instructors.length);
      let nextVictim = this.state.instructors[randomIndex];
      let nextVictimsHobbies = nextVictim.hobbies.slice(0,-1);
      console.log(nextVictimsHobbies);
      let newInstructors = Object.assign({},this.state.instructors);
      newInstructors[randomIndex].hobbies = nextVictimsHobbies;
      this.setState(newInstructors);

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
