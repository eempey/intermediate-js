import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputText: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({inputText: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = [...this.state.data, this.state.inputText];
        this.setState({data, inputText: ''});
    }

    render() {
        const itemList = this.state.data.map((item, index) => (
                <li key={index}>{item}</li>
            ));

        return (
            <div className="App">
                <h1>Simple Todo App</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="inputText"
                        value={this.state.inputText}
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        Add an item
                    </button>
                </form>
                <ol>
                    {itemList}
                </ol>
            </div>
        )
    }
}

export default App;
