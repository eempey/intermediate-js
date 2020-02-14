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

let bins = histogram(adultLiteracyRateData);
console.log(xScale.ticks());

d3.select('.bins')
    .html(bins.length - 1);

console.log(bins);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - padding, padding]);

const xAxis = d3.axisBottom(xScale)
    .tickSize(5);

d3.select('svg')
    .append('g')
    .attr('transform', `translate(0, ${height- padding})`)
    .classed('x-axis', true)
    .call(xAxis);

const yAxis = d3.axisLeft(yScale);

d3.select('svg')
    .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .classed('y-axis', true)
    .call(yAxis);


let bars = d3.select('svg')
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

d3.select('svg')
    .append('text')
    .attr('x', width / 2)
    .attr('y', height)
    .style('text-anchor', 'middle')
    .text('Adult Literacy Rates (%)');

d3.select('svg')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', padding -5)
    .attr('dy', '-1.1em')
    .style('text-anchor', 'middle')
    .text('Frequency');

//EEMPEY tickvalues is the method to help with the bonus

d3.select('input')
    .on('input', () => {
        const rangeValue = d3.event.target.value;
        d3.select('.bins')
            .html(rangeValue);

        histogram.thresholds(xScale.ticks(rangeValue));

        bins = histogram(adultLiteracyRateData);
        yScale.domain([0, d3.max(bins, d => d.length)]);

        d3.select('.y-axis').call(d3.axisLeft(yScale));

        bars = d3.select('svg')
            .selectAll('.bar')
            .data(bins);

        bars
            .exit()
            .remove();

        const g = bars
            .enter()
            .append('g')
            .classed('bar', true);

        g.append('rect');

        g.merge(bars)
            .select('rect')
            .attr('x', d => xScale(d.x0))
            .attr('y', d => yScale(d.length))
            .attr('height', d => height - yScale(d.length) - padding)
            .attr('width', d => {
                const width = xScale(d.x1) - xScale(d.x0) - barPadding;
                return width > 0 ? width : 0;
            })
            .attr('fill', '#9c27b0');






/*        const year = +d3.event.target.value;
        const yearData = birthData.filter(d => d.year === year);
        xScale.domain([0, d3.max(yearData, d => d.births)]);
        histogram.domain(xScale.domain())
            .thresholds(xScale.ticks());
        const bins = histogram(yearData);
        yScale.domain([0, d3.max(bins, d => d.length)]);

        bars = d3.select('svg')
            .selectAll('.bar')
            .data(bins);

        bars
            .exit()
            .remove();

        const g = bars
            .enter()
            .append('g')
            .classed('bar', true);

        g.append('rect');
        g.append('text');

        g.merge(bars)
            .select('rect')
            .attr('x', (d, i) => xScale(d.x0))
            .attr('y', d => yScale(d.length))
            .attr('height', d => height - yScale(d.length))
            .attr('width', d => {
                const width = xScale(d.x1) - xScale(d.x0) - barPadding;
                return width < 0 ? 0 : width;
            })
            .attr('fill', '#9c27b0');

        g.merge(bars)
            .select('text')
            .text(d => d.x0 + ' - ' + d.x1 + " (bar height: " + d.length + ")")
            .attr('transform', 'rotate(-90)')
            .attr('y', d => (xScale(d.x1) + xScale(d.x0)) / 2)
            .attr('x', - height + 10)
            .style('alignment-baseline', 'middle');*/
    });


