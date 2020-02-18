const width = 600;
const height = 600;
const minYear = d3.min(birthData, d => d.year);
const maxYear = d3.max(birthData, d => d.year);

d3.select('.year')
    .html(minYear);

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
    .on('input', () => {
        d3.select('.year')
            .html(d3.event.target.value);
        makeGraph(d3.event.target.value)
    });

let months = birthData.reduce((accumulator, currentValue) => {
    if (!accumulator.find(acc => acc === currentValue.month)) {
        accumulator.push(currentValue.month);
    }

    return accumulator;
}, []);



/*const colorScale = d3.scaleOrdinal()
    .domain(months)
    .range(d3.interpolateRainbow(0), d3.interpolateRainbow(1));*/
const colorScale = d3.scaleOrdinal([...d3.schemeSpectral[11], '#000']);
const innerColorScale = d3.scaleOrdinal(d3.schemeSpectral[4]);

makeGraph(minYear);

function makeGraph(year) {
    const yearData = birthData.filter(bd => bd.year === parseInt(year));
    console.log(yearData);

    const quarterData = yearData.reduce((accumulator, currentMonth, currentIndex) => {
        if (currentIndex < 3){
            accumulator[0].births += currentMonth.births;
        } else if (currentIndex >= 3 && currentIndex < 6) {
            accumulator[1].births += currentMonth.births;
        } else if (currentIndex >= 6 && currentIndex < 9) {
            accumulator[2].births += currentMonth.births;
        } else if (currentIndex >= 9 ) {
            accumulator[3].births += currentMonth.births;
        }

        return accumulator;
    }, [{quarter: 1, births: 0},{quarter: 2, births: 0},{quarter: 3, births: 0},{quarter: 4, births: 0}]);

    console.log(quarterData);
    const arcs = d3.pie()
        .value(d => d.births)
        .sort(null)
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
        .attr('fill', d => colorScale(d.data.month))
        .attr('stroke', 'black')
        .attr('d', path)
        .attr('id', d => d.data.month);

    const innerArcs  = d3.pie()
        .value(d => d.births)
        .sort(null)
        (quarterData);

    const innerPath = d3.arc()
        .outerRadius(width / 4)
        .innerRadius(0);

    const innerUpdate = d3.select('.chart')
        .selectAll('.inner-arc')
        .data(innerArcs);

    innerUpdate
        .exit()
        .remove();

    innerUpdate
        .enter()
        .append('path')
        .classed('inner-arc', true)
        .merge(innerUpdate)
        .attr('fill', d => innerColorScale(d.data.quarter))
        .attr('stroke', 'black')
        .attr('d', innerPath)
        .attr('id', d => d.data.quarter);

}