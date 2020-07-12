const width = 500;
const height = 500;
const padding = 30;

const publicFunding = d3.json('percent-of-healthcare-that-is-publically-funded.json', (error, response) => {
    if (error) throw error;

    publicFunding = response.fact;
    //     .filter(item => item.dims.YEAR === '2017')
    //     .map(item => {
    //         return {
    //             proportionPublicallyFunded: item.Value,
    //             country: item.dims.COUNTRY,
    //         }
    // });

});
console.log(publicFunding);
d3.json('owid-covid-data.json', (error, response) => {
    const chartData = Object.entries(response).map(item => {
        const country = item[1].location;
        const publicFundingMatch = publicFunding.find(el => el.dims.COUNTRY === country && el.dims.YEAR === 2017);
        item[1].proportionOfPublicHealthcareFunding = publicFundingMatch.Value;

        return item[1];
    });
    // const chartData = response.map(item => {
    //    item.proportionOfPublicHealthcareFunding = 400;
    // });
   console.log(chartData);
});

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

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(xAxis);

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis);