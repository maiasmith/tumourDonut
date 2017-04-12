var VoronoiOverlay = function(opts) {
    this.cx = opts.cx;
    this.cy = opts.cy;
    this.r = opts.r;
    this.element = opts.d3Element;
    this.strokeWidth = (typeof opts.strokeWidth != "undefined") ? opts.strokeWidth : 1;

    this.sites = d3.range(500).map(function(d) { return [Math.random() * this.r*2, Math.random() * this.r*2]; });
    this.voronoiFunction = d3.voronoi().extent([[-1, -1], [this.r*2 + 1, this.r*2 + 1]]);

    this.draw();
}

VoronoiOverlay.prototype.draw = function() {
    this.g = this.element.append("g")
        .attr("class", "voronoiOverlay")
        .attr("transform", "translate(" + (this.cx-this.r) + "," + (this.cy-this.r) + ")");

    var polygon = this.g.selectAll("path")
        .data(this.voronoiFunction.polygons(this.sites))
        .enter().append("path")
        .attr("stroke", "white")
        .attr("stroke-width", this.strokeWidth)
        .attr("fill", "none")
        .call(redrawPolygon);
}

function redrawPolygon(polygon) {
  polygon
      .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}