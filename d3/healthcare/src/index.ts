import { getChartData, IChartData } from './data';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { select, selectAll, event } from 'd3-selection';
import { extent } from 'd3-array';
import 'd3-transition';
require('./styles.scss');

const width = 1200;
const height = 600;
const padding = 60;

const tooltip = select('#tooltip')
    .append('div')
    .classed('tooltip', true);

function showToolTip(d) {
    tooltip
        .style('opacity', 1)
        .style('left', event.x - (tooltip.node().offsetWidth / 2) + 'px')
        .style('top', event.y + 'px')
        .html(`
                <p>Country: ${d.location}</p>
                <p>Continent: ${d.continent}</p>
            `);
}

function hideToolTip(d){
    tooltip.style('opacity', 0);
}

function renderData(chartData: IChartData[], xScale, yScale, colorScale) {
    // @ts-ignore
    const checkedBoxes = selectAll('input[name="continents"]:checked').nodes().map(box => box.value);

    const filteredData = chartData.filter(d => checkedBoxes.includes(d.continent));
    const t = select('svg').transition()
        .duration(1000);

    select('svg')
        .selectAll('circle')
        .data(filteredData, (d: IChartData) => d.location)
        .join(
            enter => enter.append('circle')
                .attr('opacity', 0)
                .attr('fill', 'purple')
                .call(enter => enter.transition(t)
                    .attr('opacity', 1)),
            update => update,
            exit => exit
                .call(exit => exit.transition(t)
                    .attr('opacity', 0)
                    .remove())
        )
        .attr('cx', d => xScale(d.pCFunding))
        .attr('cy', d => yScale(d.data.slice(-1)[0].total_deaths_per_million))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.proportionOfPublicHealthcareFunding))
        .on('mousemove', showToolTip)
        .on('touchstart', showToolTip)
        .on('mouseout', hideToolTip)
        .on('touchend', hideToolTip);
}

getChartData().then(chartData => {
    const deathsPerMillionExtent = extent(chartData, d => {
        const lastElement = d.data.slice(-1)[0];
        return lastElement.total_deaths_per_million;
    });

    const yScale = scaleLinear()
        .domain(deathsPerMillionExtent)
        .range([height - padding, 10]);

    const xScale = scaleLinear()
        .domain(extent(chartData, d => d.pCFunding))
        .range([padding, width - padding]);

    const xAxis = axisBottom(xScale)
        .tickSize(-height + padding)
        .tickSizeOuter(0)
        .tickFormat(d => `$${ Number(Number(d)/1000).toLocaleString() }K`);

    const yAxis = axisLeft(yScale)
        .tickSize(-width + padding)
        .tickSizeOuter(0);

     const colorScale = scaleLinear()
        .domain(extent(chartData, d => d.proportionOfPublicHealthcareFunding))
         // @ts-ignore
        .range(['red', 'lightgreen']);

    select('svg')
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis);

    select('svg')
        .append('g')
        .attr('transform', 'translate(' + padding + ',0)')
        .call(yAxis);


    // text label for the x axis
    select('svg')
        .append('text')
        .attr('transform',
            'translate(' + (width/2) + ' ,' +
                            (height - 10) + ')')
        .style('text-anchor', 'middle')
        .text('Per capita healthcare spending (USD)');

    select('svg')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x',0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Death rate');

    renderData(chartData, xScale, yScale, colorScale);

    // Update chart based on checkbox values
    selectAll('input[name="continents"]')
        .on('change', () => {
            renderData(chartData, xScale, yScale, colorScale);
        });

}).catch(function(err) {
    console.log(err);
    // handle error here
});


