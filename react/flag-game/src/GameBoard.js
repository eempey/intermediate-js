import React, {Component} from 'react';

const GAMESTATE = {
    gameOn: 0,
    correct: 1,
    incorrect: 2
};

class GameBoard extends Component {
    constructor(props){
        super(props);

        this.generateNewGame();

        this.state = {
            selectedCountry: null,
            gameState: GAMESTATE.gameOn
        };
    }

    generateNewGame = () => {
        const {flagData} = this.props;
        const shuffledFlags = flagData.sort(() => 0.5 - Math.random());
        this.countryGuesses = shuffledFlags.slice(0, 4);
        this.country = this.countryGuesses[Math.floor(Math.random() * this.countryGuesses.length)];
        this.countryFlag = this.country.flag;
    };

    handleGuess = (event) => {
        event.preventDefault();

        if (this.state.gameState !== GAMESTATE.gameOn) {
            this.generateNewGame();
            this.setState({
                selectedCountry: null,
                gameState: GAMESTATE.gameOn
            });

            return;
        }

        if (this.country.name === this.state.selectedCountry) {
            this.setState({
                gameState: GAMESTATE.correct
            });

            return;
        }

        this.setState({
            gameState: GAMESTATE.incorrect
        });
        console.log(this.state);

    };

    handleOptionChange = (event) => {
        this.setState({
            selectedCountry: event.target.value
        });
        console.log(this.state);
    };

    render(){
        let countryOptions = this.countryGuesses.map((country) => (
                <label key={country.alpha3Code}
                       htmlFor={country.alpha3Code}
                >
                    <input
                        type="radio"
                        id={country.alpha3Code}
                        value={country.name}
                        checked={this.state.selectedCountry === country.name}
                        onChange={this.handleOptionChange}
                    />
                    {country.name} {country.alpha3Code}
                </label>
        ));
        let buttonText = 'Guess';

        if (this.state.gameState === GAMESTATE.correct) {
            countryOptions = `Correct! The flag belongs to ${this.country.name}`;
            buttonText = 'Next';
        }

        if (this.state.gameState === GAMESTATE.incorrect) {
            countryOptions = `Incorrect. The flag belongs to ${this.country.name}`;
            buttonText = 'Next';
        }

        return (<div>
            <form onSubmit={this.handleGuess}>
                {countryOptions}
                <button type="submit">{buttonText}</button>
            </form>
            <img src={this.countryFlag} alt=""/>
        </div>);
    }
}

export default GameBoard;