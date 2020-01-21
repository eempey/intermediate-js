const width = 800;
const height = 800;
const padding = 40;
const barPadding = 1;
const minValue = d3.min(regionData, d => d.adultLiteracyRate);
const maxValue = d3.max(regionData, d => d.adultLiteracyRate);
const adultLiteracyRateData = regionData.filter(d => d.adultLiteracyRate !== null);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(adultLiteracyRateData, d => d.adultLiteracyRate)])
    .rangeRound([padding, width - padding]);

const histogram = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks())
    .value(d => d.adultLiteracyRate);

const bins = histogram(adultLiteracyRateData);

console.log(bins);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - padding, padding]);

const xAxis = d3.axisBottom(xScale)
    .tickSize(5);

d3.select('svg')
    .append('g')
    .attr('transform', `translate(0, ${height- padding})`)
    .call(xAxis);

const yAxis = d3.axisLeft(yScale)
    .tickSize(5)
    .tickSizeOuter(5);

d3.select('svg')
    .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);


const bars = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
    .selectAll('.bar')
    .data(bins)
    .enter()
    .append('g')
        .classed('bar', true);

bars.append('rect')
    .attr('x', d => xScale(d.x0))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - yScale(d.length) - padding)
    .attr('width', d => {
        const width = xScale(d.x1) - xScale(d.x0) - barPadding;
        return width > 0 ? width : 0;
    })
    .attr('fill', '#9c27b0');

//


