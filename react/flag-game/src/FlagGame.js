import React, {Component} from 'react';
import './FlagGame.css';
import GameBoard from './GameBoard';

class FlagGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flagData: []
        }
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then((response) => response.json())
            .then(flagData => this.setState({flagData}));
    }

    render() {
        const {flagData} = this.state;
        let gameBoard = !flagData.length ?
            (<div>Loading...</div>) :
            (<GameBoard flagData={flagData} />);

        return (
            <div className="FlagGame">
                <header>
                    <h1>Guess the flag</h1>
                </header>
                {gameBoard}
            </div>
        );
    }
}

export default FlagGame;
