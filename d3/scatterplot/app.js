const width = 500;
const height = 500;
const padding = 20;

const yScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
                .range([height - padding, padding]);

const xScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.births / d.population))
                .range([padding, width - padding]);

const colorScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.population/d.area))
                    .range(['lightgreen', 'black']);

const radiusScale = d3.scaleLinear()
                        .domain(d3.extent(birthData2011, d => d.births))
                        .range([2, 40]);


d3.select('svg')
        .attr('width', width)
        .attr('height', height)
    .selectAll('circle')
    .data(birthData2011)
    .enter()
    .append('circle')
        .attr('cx', d => xScale(d.births / d.population))
        .attr('cy', d => yScale(d.lifeExpectancy))
        .attr('r', d => radiusScale(d.births))
        .attr('fill', d => colorScale(d.population / d.area));