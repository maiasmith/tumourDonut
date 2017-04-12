var data = [
    {"clone": "A", "prev": 0.1},
    {"clone": "B", "prev": 0.6},
    {"clone": "C", "prev": 0.3}
];

d3.select("body").attr("height", "100%")
var viewDIV = d3.select("body").append("div").attr("id", "viewDIV")
                .style("position", "relative")
                .style("width", "100vw")
                .style("height", "100vh");
var viewSVG = viewDIV.append("svg").attr("width", "100%").attr("height", "100%");

var cx = 250;
var cy = 250;
var r = 100;

var tumourDonut = new TumourDonut({
    cx: cx,
    cy: cy,
    r: r,
    d3Element: viewSVG,
    data: data
});

var voronoiOverlay = new VoronoiOverlay({
    cx: cx,
    cy: cy,
    r: r,
    d3Element: viewSVG
});