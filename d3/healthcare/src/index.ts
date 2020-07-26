import { getChartData } from './data';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { select, event } from 'd3-selection';
import { extent } from 'd3-array';

const width = 1200;
const height = 600;
const padding = 30;

 getChartData().then(chartData => {
    console.log(chartData);

    const deathsPerMillionExtent = extent(chartData, d => {
        const lastElement = d.data.slice(-1)[0];
        return lastElement.total_deaths_per_million;
    });

    const yScale = scaleLinear()
        .domain(deathsPerMillionExtent)
        .range([height - padding, padding]);

    const xScale = scaleLinear()
        .domain(extent(chartData, d => d.pCFunding))
        .range([padding, width - padding]);

    const xAxis = axisBottom(xScale)
        .tickSize(-height + 2 * padding)
        .tickSizeOuter(0);
    const yAxis = axisLeft(yScale)
        .tickSize(-width + 2 * padding)
        .tickSizeOuter(0);

     const colorScale = scaleLinear()
        .domain(extent(chartData, d => d.proportionOfPublicHealthcareFunding))
         // @ts-ignore
        .range(['red', 'lightgreen']);

    const tooltip = select('body')
        .append('div')
        .classed('tooltip', true);

    select('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis);

    select('svg')
        .append('g')
        .attr('transform', 'translate(' + padding + ',0)')
        .call(yAxis);

    select('svg')
        .selectAll('circle')
        .data(chartData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.pCFunding))
        .attr('cy', d => yScale(d.data.slice(-1)[0].total_deaths_per_million))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.proportionOfPublicHealthcareFunding))
        .on('mousemove', showToolTip)
        .on('touchstart', showToolTip)
        .on('mouseout', hideToolTip)
        .on('touchend', hideToolTip);

    function showToolTip(d) {
        tooltip
            .style('opacity', 1)
            .style('left', event.x - (tooltip.node().offsetWidth / 2) + 'px')
            .style('top', event.y + 'px')
            .html(`
                <p>Country: ${d.location}</p>
            `);
    }

    function hideToolTip(d){
        tooltip.style('opacity', 0);
    }

}).catch(function(err) {
    console.log(err);
    // handle error here
});


