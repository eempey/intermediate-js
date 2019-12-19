// Math proportions of american flag found here:
// https://www.inchcalculator.com/american-flag-size-proportions-calculator/
const width = 1160;
const height = 611;
const starOuterRadius = height * 0.063 / 2;
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

        var currX = centerX + Math.cos(i * angle) * r;
        var currY = centerY + Math.sin(i * angle) * r;

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
    .attr('width', width/5 * 2 + 'px')
    .attr('height', height/13 * 7 + 'px')
    .attr('fill', '#3C3B6E');

flag.append("svg:polygon")
    .attr('id', 'star_1')
    .attr('points', CalculateStarPoints(20, 20, 5, starOuterRadius, starInnerRadius))
    .attr('fill', 'white')
    .attr('transform', 'rotate(15 0 0)');

