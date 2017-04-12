var TumourDonut = function(opts) {
    this.cx = opts.cx || 0;
    this.cy = opts.cy || 0;
    this.r = opts.r || 50;
    this.element = opts.d3Element;
    this.data = opts.data;

    this.draw();
}

TumourDonut.prototype.draw = function() {

    this.g = this.element.append("g")
        .classed("donutG", true)
        .attr("transform", "translate(" + this.cx + "," + this.cy + ")");


    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.arc()
        .outerRadius(this.r - 10)
        .innerRadius(this.r - 70)
        .padAngle(0.03)
        .cornerRadius(8);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.prev; });        
    
    var slices = this.g.selectAll(".arc")
        .data(pie(this.data))
        .enter().append("g")
        .attr("class", "arc");

    slices.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.clone); });
}