const width = 1200;
const height = 600;
const padding = 30;

const findWHODataMatch = (rawData, NYTCountry) => {
    let WHOCountry;

    switch (NYTCountry) {
        case 'United States':
            WHOCountry = 'United States of America';
            break;
        case 'Bolivia':
            WHOCountry = 'Bolivia (Plurinational State of)';
            break;
        case 'Brunei':
            WHOCountry = 'Brunei Darussalam';
            break;
        case 'Cape Verde':
            WHOCountry = 'Cabo Verde';
            break;
        case 'Cote d\'Ivoire':
            WHOCountry = 'Côte d\'Ivoire';
            break;
        case 'Czech Republic':
            WHOCountry = 'Czechia';
            break;
        case 'Democratic Republic of Congo':
            WHOCountry = 'Democratic Republic of the Congo';
            break;
        case 'Iran':
            WHOCountry = 'Iran (Islamic Republic of)';
            break;
        case 'Laos':
            WHOCountry = 'Lao People\'s Democratic Republic';
            break;
        case 'South Korea':
            WHOCountry = 'Republic of Korea';
            break;
        case 'Moldova':
            WHOCountry = 'Republic of Moldova';
            break;
        case 'Russia':
            WHOCountry = 'Russian Federation';
            break;
        case 'Syria':
            WHOCountry = 'Syrian Arab Republic';
            break;
        case 'Timor':
            WHOCountry = 'Timor-Leste';
            break;
        case 'United Kingdom':
            WHOCountry = 'United Kingdom of Great Britain and Northern Ireland';
            break;
        case 'Tanzania':
            WHOCountry = 'United Republic of Tanzania';
            break;
        case 'Venezuela':
            WHOCountry = 'Venezuela (Bolivarian Republic of)';
            break;
        case 'Vietnam':
            WHOCountry = 'Viet Nam';
            break;
        default:
            WHOCountry = NYTCountry;
    }

    return rawData.find(el => el.dims.COUNTRY === WHOCountry && el.dims.YEAR === "2017");
};

Promise.all([
    d3.json('owid-covid-data.json'),
    d3.json('percent-of-healthcare-that-is-publicly-funded.json'),
    d3.json('privatePerCapitaHealthcareSpending.json'),
    d3.json('publicPerCapitaHealthcareSpending.json'),
]).then(function([covidData, phpf, privatePCFundingRaw, publicPCFundingRaw]) {
    const percentOfHealthcarePubliclyFunded = phpf.fact;
    const privatePCFunding = privatePCFundingRaw.fact;
    const publicPCFunding = publicPCFundingRaw.fact;

    // This code just existed to see the WHO countries that had names that didn't exist in the COVID data
    // const whoCountries = [...new Set(privatePCFunding.map(item => item.dims.COUNTRY))];
    // const whoCountriesFiltered = whoCountries.filter(whoCountry => {
    //     return !Object.entries(covidData).find(element => element[1].location === whoCountry);
    // });
    // console.log(whoCountriesFiltered);


    const chartData = Object.entries(covidData).map(item => {
        const country = item[1].location;

        const publicFundingMatch = findWHODataMatch(percentOfHealthcarePubliclyFunded, country);
        const publicPCFundingMatch = findWHODataMatch(publicPCFunding, country);
        const privatePCFundingMatch = findWHODataMatch(privatePCFunding, country);

        item[1].proportionOfPublicHealthcareFunding =
            publicFundingMatch ? publicFundingMatch.Value : '';

        item[1].publicPCFunding =
            publicPCFundingMatch ? parseFloat(publicPCFundingMatch.Value) : '';

        item[1].privatePCFunding =
            privatePCFundingMatch ? parseFloat(privatePCFundingMatch.Value) : '';

        item[1].pCFunding =
            item[1].privatePCFunding + item[1].publicPCFunding;


        return item[1];
    }).filter(item => item.privatePCFunding && item.publicPCFunding && item.proportionOfPublicHealthcareFunding);

    console.log(chartData);

    const deathsPerMillionExtent = d3.extent(chartData, d => {
        const lastElement = d.data.slice(-1)[0];
        return lastElement.total_deaths_per_million;
    });

    const yScale = d3.scaleLinear()
        .domain(deathsPerMillionExtent)
        .range([height - padding, padding]);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(chartData, d => d.pCFunding))
        .range([padding, width - padding]);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + 2 * padding)
        .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-width + 2 * padding)
        .tickSizeOuter(0);

    const tooltip = d3.select('body')
        .append('div')
        .classed('tooltip', true);

    d3.select('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis);

    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + padding + ',0)')
        .call(yAxis);

    d3.select('svg')
        .selectAll('circle')
        .data(chartData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.pCFunding))
        .attr('cy', d => yScale(d.data.slice(-1)[0].total_deaths_per_million))
        .attr('r', 5)
        .on('mousemove', showToolTip)
        .on('touchstart', showToolTip)
        .on('mouseout', hideToolTip)
        .on('touchend', hideToolTip);

    function showToolTip(d) {
        tooltip
            .style('opacity', 1)
            .style('left', d3.event.x - (tooltip.node().offsetWidth / 2) + 'px')
            .style('top', d3.event.y + 'px')
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


