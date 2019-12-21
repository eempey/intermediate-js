// Math proportions of american flag found here:
// https://www.inchcalculator.com/american-flag-size-proportions-calculator/
const height = 305;
const width = height * 1.9;
const unionWidth = height * 0.76;
const starOuterRadius = height * 0.0616 / 2;
const starInnerRadius = starOuterRadius * 0.382;

// borrowed this method from
// https://dillieodigital.wordpress.com/2013/01/16/quick-tip-how-to-draw-a-star-with-svg-and-javascript/
function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius)
{
    var results = "";

    var angle = Math.PI / arms;

    for (var i = 0; i < 2 * arms; i++)
    {
        // Use outer or inner radius depending on what iteration we are in.
        var r = (i & 1) == 0 ? outerRadius : innerRadius;

        var currX = centerX + Math.cos(i * angle + 60) * r;
        var currY = centerY + Math.sin(i * angle + 60) * r;

        // Our first time we simply append the coordinates, subsequet times
        // we append a ", " to distinguish each coordinate pair.
        if (i == 0)
        {
            results = currX + "," + currY;
        }
        else
        {
            results += ", " + currX + "," + currY;
        }
    }

    return results;
}

function generateStarData(){
    const stars = [];
    let xOffset = 0;
    let yOffset = 0;
    let newStarRow = 0;
    const starWidth = height * 0.063;
    for (let i = 0; i <= 50; i++) {
        let star = {};
        star.color = 'white';

        star.centerY = 0;

        star.centerX = xOffset * starWidth * 2 + starWidth;
        yOffset = height * 0.054 * newStarRow;
        star.centerY = height * 0.054  + yOffset;

        if (newStarRow % 2 !== 0 ) {
            star.centerX += starWidth;
        }
        if (star.centerX > (unionWidth - starWidth)) {
            newStarRow+=1;
            xOffset = 0;
            star.centerX = xOffset * starWidth * 2 + starWidth;
            if (newStarRow % 2 === 0 ) {
                star.centerX += starWidth;
            }
        }
        star.xOffset = xOffset;
        star.i = i;
        star.newStarRow = newStarRow;
        star.starContainerWidth = starWidth;
        star.unionWidth = unionWidth;
        star.maxWidth = unionWidth - star.starContainerWidth;
        stars.push(star);

        xOffset++;
    }

    return stars;
}



const flag = d3.select('#american-flag')
    .select('svg')
    .style('width', width + 'px')
    .style('height', height + 'px');

// add the stripes
for(let i=0; i < 13; i++) {
    const rectangleHeight = height/13;
    flag.append('rect')
        .attr('y', i * rectangleHeight + 'px')
        .attr('width', width + 'px')
        .attr('height', rectangleHeight)
        .attr('stroke-width', 0)
        .attr('fill', () => i % 2 === 0 ? '#B22234' : '')
}

// add the union. 2/5 the width and 7 stripes high
flag.append('rect')
    .attr('width', unionWidth + 'px')
    .attr('height', height/13 * 7 + 'px')
    .attr('fill', '#3C3B6E');

// Add the stars
flag.selectAll("polygon")
    .data(generateStarData())
    .enter()
    .append('polygon')
    .attr('points', d => {
        return CalculateStarPoints(d.centerX, d.centerY, 5, starOuterRadius, starInnerRadius)
    })
    .attr('fill', d => d.color);




