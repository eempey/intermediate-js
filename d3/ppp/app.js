const margin = 80;
const width = 1250 - 2 * margin;
const height = 600 - 2 * margin;
const data2 = [
    {label: 1, value: 5},
    {label: 2, value: 10},
    {label: 3, value: 57},
    {label: 4, value: 38},
    {label: 5, value: 19},
];

const data1 = [
    {label: 1, value: 3},
    {label: 2, value: 8},
    {label: 3, value: 27},
    {label: 4, value: 38},
    {label: 5, value: 46},
    {label: 6, value: 19},
    {label: 7, value: 32},
    {label: 8, value: 18}
];

let data1Entered = true;

const makeChart = (data) => {
    const svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'green');

    svg.append('g').attr('id','goodness');
    const chart = d3.select('#goodness');
        //.attr('transform', `translate(${margin},${margin})`);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, d => d.value)]);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(data.map(s => s.label))
        .padding(0.2);

    const barGroups = chart
        .selectAll('.bar')
        .data(data);

    console.log(barGroups);

    //console.log(barGroups.exit());
    barGroups
        .exit()
        .remove();

    //console.log(barGroups.enter());

    barGroups
        .enter()
        .append('rect')
        .classed('bar', true)
        .merge(barGroups)
        .attr('x', (g) => xScale(g.label))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())

    data1Entered = !data1Entered;
}

makeChart(data2);

d3.select('#clickMe')
    .on('click', () => {
        const dataToEnter = data1Entered ? data2 : data1;
        makeChart(dataToEnter);
    });


