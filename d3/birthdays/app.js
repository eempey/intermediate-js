const minYear = d3.min(birthData, d => d.year);
const maxYear = d3.max(birthData, d => d.year);
const width = 600;
const height = 600;
const numBars = 12;
const padding = 5;
const barWidth = width / numBars - padding;
const maxBirths = d3.max(birthData, d => d.births);

d3.select("input")
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear);

let yScale = d3.scaleLinear()
                .domain([0, maxBirths])
                .range([height, 0]);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect')
        .data(birthData.filter((d) => d.year === minYear))
        .enter()
        .append('rect')
            .attr('width', barWidth)
            .attr('height', d => height - yScale(d.births))
            .attr('y', d => yScale(d.births))
            .attr('x', (d, index) => (barWidth + padding) * index)
            .attr('fill', 'purple');

d3.select('input')
    .on('input', () => {
        const year = +d3.event.target.value;
        console.log(year);
        d3.selectAll('rect')
            .data(birthData.filter((d) => d.year === year))
            .attr('y', d => yScale(d.births))
            .attr('height', d => height - yScale(d.births))
    });
