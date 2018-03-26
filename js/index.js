var margin = { top: 50, right: 50, bottom: 10, left: 30 },
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var svg = d3.select("#map")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");

var projection = d3.geoMercator()
    .center([5.690973, 50.851368])
    .scale(110000)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var totaalInw = [0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000];
var palette = ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'];

var color = d3.scaleLinear()
    .domain(totaalInw)
    .range(palette);

var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("../../map/maastricht.json", function(err, json) {
    if (err) throw error;

    function drawMap() {
        svg = svg.append("g")
            .attr("class", "maastricht")
            .selectAll("#map")
            .data(json.features);

        svg
            .enter().append("g")
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                return color(d.properties.AANT_INW);
            })
            .on("mouseover", function(d) {
                tip.transition()
                    .duration(300)
                    .style("opacity", .9)
                tip.html(
                    "<h4>" + "Plaats " + "</h4>" + "<p>" + d.properties.BU_NAAM + "</p>" +
                    "<br>" + "<hr> " +
                    "<h4>" + "Inwoners " + "</h4>" + "<p>" + d.properties.AANT_INW) + "</p>"
            })
            .on("mousemove", function(d) {
                tip                   
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY + 5) + "px");
            })
            .on("mouseout", function(d) {
                tip.transition()
                    .duration(300)
                    .style("opacity", 0);
            });
    };
    
    drawMap();
});
