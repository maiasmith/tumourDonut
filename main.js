var data = [
    {"clone": "A", "prev": 0.01, "colour": "blue"},
    {"clone": "B", "prev": 0.6, "colour": "pink"},
    {"clone": "C", "prev": 0.3, "colour": "yellow"},
    {"clone": "D", "prev": 0.09, "colour": "red"}
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
var outerR = 100;
var innerR = 30;

var tumourDonut = new TumourDonut({
    cx: cx,
    cy: cy,
    r: r,
    innerRadius: innerR,
    outerRadius: outerR,
    d3Element: viewSVG,
    data: data,
    padAngle: 0.02,
    cornerRadius: 3
});

var voronoiOverlay = new VoronoiOverlay({
    cx: cx,
    cy: cy,
    outerR: outerR,
    innerR: innerR,
    strokeWidth: 1,
    d3Element: viewSVG
});