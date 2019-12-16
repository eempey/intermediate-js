const input =  d3.select('input');
const thaForm = d3.select('#thaForm');

d3.select('#reset').on('click', () => {
   d3.select('#phrase').text('');
   d3.select('#count').text('');
   d3.selectAll('.letter').remove();
});

const createDataArray = (phrase) => {
    return phrase.split('').reduce((accumulator, currentValue) => {
        let objectExists = accumulator.findIndex((element) => typeof element[currentValue] !== 'undefined');
        if (objectExists > -1) {
            accumulator[objectExists][currentValue] += 1;
        } else {
            accumulator.push({[currentValue]: 1});
        }

        return accumulator;
    }, []);
};

thaForm.on('submit', (e) => {
    d3.event.preventDefault();
    const phrase = input.property('value');

    const dataArray = createDataArray(phrase);
    input.property('value', '');
    d3.select('#phrase')
        .text(`Analysis of ${phrase}`);



    console.log(dataArray);

    const bars = d3.select('#letters')
        .selectAll('.letter')
        .data(dataArray, (d) => Object.keys(d)[0]);

    bars.classed('new', false)
        .exit().remove();

    bars
        .enter()
        .append('div')
            .classed('letter', true)
            .classed('new', true)
        .merge(bars)
            .style('height', (d) => Object.values(d)[0] * 40 + 'px' )
            .text((d) => Object.keys(d)[0]);

    d3.select('#count')
        .text(`(New characters: ${bars.enter().nodes().length})`);
});