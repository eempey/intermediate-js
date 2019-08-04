import React, {Component} from 'react';
import './App.css';

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

    this.state = {
      cards
    }
  }

  getSelectedCards(){
    return this.state.cards.filter((card) => {
      return card.cardState === 1;
    })
  };

  createAndShuffleCards(colors) {
    const numberOfCards = colors.length;
    const cards = [];

    for(let i=0; i<numberOfCards; i++){
      let randomColorIndex = Math.floor(Math.random() * colors.length);
      cards.push({
        id: i,
        cardState: CardState.HIDING,
        color: colors[randomColorIndex],
        backgroundColor: '#2f2f2f'
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

  flipCard(key) {
    let {cards} = this.state;
    console.log(key);
    let selectedCards = this.getSelectedCards();

    if (selectedCards.length < 2){
      cards = cards.map((card) => {
        if(card.id === key){
          card.backgroundColor = card.color;
          card.cardState = 1;
        }

        return card;
      });
    }
    selectedCards = this.getSelectedCards();
    this.setState({cards});

    console.log(selectedCards);

    if(selectedCards.length === 2){
        if (selectedCards[0].backgroundColor === selectedCards[1].backgroundColor){
          selectedCards[0].cardState = 3;
          selectedCards[1].cardState = 3;
        } else {
            selectedCards[0].backgroundColor = '#2f2f2f';
            selectedCards[1].backgroundColor = '#2f2f2f';
            selectedCards[0].cardState = 0;
            selectedCards[1].cardState = 0;
        }

    }
    this.setState({cards});
    //event.target.style.backgroundColor = '#330000';
  }

  render(){
    const {cards} = this.state;
    console.log(cards);
    const gameBoard = cards.map((card) => (
        <div
            key={card.id}
            className="card"
            style={{backgroundColor: card.backgroundColor}}
            onClick={() => this.flipCard(card.id)}
        ></div>
    ));

    return (
        <div>{gameBoard}</div>
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