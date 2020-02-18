var minYear = d3.min(birthData, d => d.year);
const maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;
var yearData = birthData.filter(d => d.year === minYear);

let continents = birthData.reduce((accumulator, currentValue) => {
    if (!accumulator.find(acc => acc === currentValue.continent)) {
        accumulator.push(currentValue.continent);
    }

    return accumulator;
}, []);

const colorScale = d3.scaleOrdinal()
    .domain(continents)
    .range(d3.schemeCategory10);

d3.select('svg')
        .attr('width', width)
        .attr('height', height)
    .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .classed('chart', true);

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear)
    .on('input', () => {makeGraph(d3.event.target.value)});

makeGraph(minYear);

function makeGraph(year) {
    const yearData = birthData.filter(bd => bd.year === parseInt(year));

    const arcs = d3.pie()
        .value(d => d.births)
        .sort((a,b) => {
            if (a.continent < b.continent) return -1;
            else if (a.continent > b.continent) return 1;
            else return a.births - b.births;
        })
        (yearData);

    const path = d3.arc()
        .outerRadius(width / 2 - 10)
        .innerRadius(width / 4);

    const update = d3.select('.chart')
        .selectAll('.arc')
        .data(arcs);

    update
        .exit()
        .remove();

    update
        .enter()
        .append('path')
            .classed('arc', true)
        .merge(update)
        .attr('fill', d => colorScale(d.data.continent))
        .attr('stroke', 'black')
        .attr('d', path);

}