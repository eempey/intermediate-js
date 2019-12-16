var quotes = [
    {
        quote: "I see dead people.",
        movie: "The Sixth Sense",
        year: 1999,
        rating: "PG-13"
    }, {
        quote: "May the force be with you.",
        movie: "Star Wars: Episode IV - A New Hope",
        year: 1977,
        rating: "PG"
    }, {
        quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
        movie: "Dirty Harry",
        year: 1971,
        rating: "R"
    }, {
        quote: "You had me at 'hello.'",
        movie: "Jerry Maguire",
        year: 1996,
        rating: "R"
    }, {
        quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
        movie: "Finding Nemo",
        year: 2003,
        rating: "G"
    }
];

var newQuotes = [
    {
        quote: "Houston, we have a problem.",
        movie: "Apollo 13",
        year: 1995,
        rating: "PG-13"
    }, {
        quote: "Gentlemen, you can't fight in here! This is the war room!",
        movie: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
        rating: "PG"
    }
];

const colors = {
    'G': '#84d46a',
    'PG': '#f7f460',
    'PG-13': '#ff9000',
    'R': '#d71f1e'
};

const refreshQuotes = function(quotes) {
    d3.select('#quotes')
        .style('list-style', 'none')
        .selectAll('li')
        .data(quotes)
        .enter()
        .append('li')
        .text((d) => `${d.quote} - ${d.movie} ${d.year}`)
        .style('margin', '20px')
        .style('padding', '20px')
        .style('font-size', function(d){
            return d.quote.length < 25 ? '2em' : '1em'
        })
        .style('background-color', d => colors[d.rating])
        .style('border-radius', '8px');
};

refreshQuotes(quotes);

const removeButton = d3.select('#remove');
removeButton.on('click', () => {
    const nonRQuotes = quotes.filter(movie => movie.rating !== 'R');
    d3.selectAll('li')
        .data(nonRQuotes, (d) => d.quote)
        .exit()
        .remove();

    removeButton.remove();
});

const add = d3.select('#addMore');
add.on('click', () => {
    const allQuotes = [...quotes, ...newQuotes];
   refreshQuotes(allQuotes);
})
