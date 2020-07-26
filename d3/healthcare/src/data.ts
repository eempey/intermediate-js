import { json } from 'd3-fetch';

interface IWHOData {
    dimension: any;
    fact: any;
}

interface IChartData {
    aged_65_older: Number;
    aged_70_older: Number;
    cardiovasc_death_rate: Number;
    continent: string;
    data: Array<any>;​​​
    diabetes_prevalence: Number;
    extreme_poverty: Number;
    female_smokers: Number;
    gdp_per_capita: Number;
    handwashing_facilities: Number;
    hospital_beds_per_thousand: Number;
    life_expectancy: Number;
    location: string;
    male_smokers: Number;
    median_age: Number;
    pCFunding: Number;
    population: Number;
    population_density: Number;
    privatePCFunding: Number;
    proportionOfPublicHealthcareFunding: string; // EEMPEY fix this
    publicPCFunding: Number;
}

const findWHODataMatch = (rawData, NYTCountry) => {
    let WHOCountry: string;

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

const somePromise = new Promise((resolve, reject) => {
    resolve([1, 2, 3, 4, 5]);
});

export function someData() {
    return somePromise.then(response => response);
}

export function getChartData() {
    return Promise.all<IChartData, IWHOData, IWHOData, IWHOData>([
        json('owid-covid-data.json'),
        json('percent-of-healthcare-that-is-publicly-funded.json'),
        json('privatePerCapitaHealthcareSpending.json'),
        json('publicPerCapitaHealthcareSpending.json'),
    ]).then(function ([covidData, phpf, privatePCFundingRaw, publicPCFundingRaw]) {
        const percentOfHealthcarePubliclyFunded = phpf.fact;
        const privatePCFunding = privatePCFundingRaw.fact;
        const publicPCFunding = publicPCFundingRaw.fact;

        // This code just existed to see the WHO countries that had names that didn't exist in the COVID data
        // const whoCountries = [...new Set(privatePCFunding.map(item => item.dims.COUNTRY))];
        // const whoCountriesFiltered = whoCountries.filter(whoCountry => {
        //     return !Object.entries(covidData).find(element => element[1].location === whoCountry);
        // });
        // console.log(whoCountriesFiltered);


        return Object.entries(covidData).map(item => {
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
    });
}

