import React, {Component} from 'react';
import Navbar from './Navbar'
import Card from './Card';

const CardState = {
    HIDING: 0,
    SHOWING: 1,
    MATCHING: 2
};

class MemoryGame extends Component {
    constructor(props) {
        super(props);

        const colors = this.pickRandomColors(8);
        console.log(colors);
        const cards = this.createAndShuffleCards(colors);
        console.log(cards);

        this.flipCard = this.flipCard.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);

        this.state = {
            cards,
            noClick: false
        }
    }

    createAndShuffleCards(colors) {
        const numberOfCards = colors.length;
        const cards = [];

        for(let i=0; i<numberOfCards; i++){
            let randomColorIndex = Math.floor(Math.random() * colors.length);
            cards.push({
                id: i,
                cardState: CardState.HIDING,
                backgroundColor: colors[randomColorIndex]
            });
            colors.splice(randomColorIndex, 1);
        }

        return cards;
    }

    pickRandomColors(n){
        let colors = [];

        for (let i = 0; i < n; i++) {
            let randomColorIndex = Math.floor(Math.random() * this.props.allColors.length);
            colors.push(this.props.allColors[randomColorIndex]);
            colors.push(this.props.allColors[randomColorIndex]);
            this.props.allColors.splice(randomColorIndex, 1);
        }

        return colors;
    }

    handleNewGame(){
        const colors = this.pickRandomColors(8);
        const cards = this.createAndShuffleCards(colors);

        this.setState({cards});

        return cards;
    }

    flipCard(id) {
        const mapCardState = (cards, idsToChange, newCardState) => {
            return cards.map(c => {
                if (idsToChange.includes(c.id)) {
                    return {
                        ...c,
                        cardState: newCardState
                    };
                }
                return c;
            });
        }

        const foundCard = this.state.cards.find(c => c.id === id);

        if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
            return;
        }

        let noClick = false;

        let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

        const showingCards =  cards.filter((c) => c.cardState === CardState.SHOWING);

        const ids = showingCards.map(c => c.id);

        if (showingCards.length === 2 &&
            showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
            cards = mapCardState(cards, ids, CardState.MATCHING);
        } else if (showingCards.length === 2) {
            let hidingCards = mapCardState(cards, ids, CardState.HIDING);

            noClick = true;

            this.setState({cards, noClick}, () => {
                setTimeout(() => {
                    // set the state of the cards to HIDING after 1.3 seconds
                    this.setState({cards: hidingCards, noClick: false});
                }, 1300);
            });
            return;
        }

        this.setState({cards, noClick});
    }

    render(){
        const {cards} = this.state;
        console.log(cards);
        const gameBoard = cards.map((card) => (
            <Card
                key={card.id}
                showing={card.cardState !== CardState.HIDING}
                backgroundColor={card.backgroundColor}
                onClick={() => this.flipCard(card.id)}
            />
        ));

        return (
            <div>
                <Navbar onNewGame={this.handleNewGame} />
                {gameBoard}
            </div>
        )
    }
}

MemoryGame.defaultProps = {
    allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
        "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
        "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
        "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
        "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
        "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
        "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
        "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
        "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
        "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
        "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
        "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
        "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
        "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
        "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
        "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
        "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
        "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
        "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
        "Yellow","YellowGreen"]
};

export default MemoryGame;