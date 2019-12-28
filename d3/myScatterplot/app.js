const width = 500;
const height = 500;
const padding = 30;

const yScale = d3.scaleLinear()
    .domain(d3.extent(birthData2015, d => d.tertiaryEducationGenderParity2015))
    .range([height - padding, padding]);

const xScale = d3.scaleLinear()
    .domain(d3.extent(birthData2015, d => d.birthsPerWoman2015))
    .range([padding, width - padding]);

const xAxis = d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0);
const yAxis = d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0);

/*const colorScale = d3.scaleLinear()
    .domain(d3.extent(birthData2015, d => d.population/d.area))
    .range(['lightgreen', 'black']);

const radiusScale = d3.scaleLinear()
    .domain(d3.extent(birthData2015, d => d.births))
    .range([2, 40]);*/


d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(xAxis);

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('circle')
    .data(birthData2015)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.birthsPerWoman2015))
    .attr('cy', d => yScale(d.tertiaryEducationGenderParity2015))
    .attr('r', 5);

d3.select('svg')
    .append('text')
    .attr('x', width / 2)
    .attr('y', height-padding)
    .attr('dy', '1.5em')
    .style('text-anchor', 'middle')
    .text('Births per Woman as of 2015');

d3.select('svg')
    .append('text')
    .attr('x', width / 2)
    .attr('y', padding)
    .style('font-size', '1.5em')
    .style('text-anchor', 'middle')
    .text('Data on Education and Birthrates in 2015');

d3.select('svg')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', padding)
    .attr('dy', '-1.1em')
    .style('text-anchor', 'middle')
    .text('Gender Parity in tertiary education');