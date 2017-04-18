var VoronoiOverlay = function(opts) {
    this.cx = opts.cx;
    this.cy = opts.cy;
    this.outerR = opts.outerR;
    this.innerR = opts.innerR;
    this.element = opts.d3Element;
    this.strokeWidth = (typeof opts.strokeWidth != "undefined") ? opts.strokeWidth : 1;

    this.sites = d3.range(800).map(function(d) { return [Math.random() * this.outerR*2, Math.random() * this.outerR*2]; });
    this.voronoiFunction = d3.geom.voronoi().clipExtent([[-1, -1], [this.outerR*2 + 1, this.outerR*2 + 1]]);

    this.draw();
}

VoronoiOverlay.prototype.draw = function() {
    var _this = this;
    this.g = this.element.append("g")
        .attr("class", "voronoiOverlay")
        .attr("transform", "translate(" + (this.cx-this.outerR) + "," + (this.cy-this.outerR) + ")");

    var polygon = this.g.selectAll("path")
        .data(this.voronoiFunction(this.sites))
        .enter().append("path")
        .attr("stroke", "white")
        .attr("stroke-width", this.strokeWidth)
        .attr("fill", "white")
        .attr("fill-opacity", function(d) {

            // for each point in the polygon
            var withinDonut = true;
            d.forEach(function(pt) {
                // if the dist from the center to this point is > the specified outer radius
                // or < the specified inner radius, fill it with white
                var a = _this.outerR - pt[0];
                var b = _this.outerR - pt[1];
                var c = Math.sqrt( a*a + b*b );                
                if (c > _this.outerR) {
                    withinDonut = false;
                }
                if (c < _this.innerR) {
                    withinDonut = false;
                }
            })

            return (!withinDonut) ? 1 : 0;
        })
        .attr("display", function(d) {
             // for each point in the polygon
            var outsideDonut = false;
            d.forEach(function(pt) {
                // if the dist from the center to this point is > the specified outer radius
                // do not display it
                var a = _this.outerR - pt[0];
                var b = _this.outerR - pt[1];
                var c = Math.sqrt( a*a + b*b );                
                if ((c-10) > _this.outerR) { // give 10px leeway
                    outsideDonut = true;
                }
            })

            return (outsideDonut) ? "none" : "auto";
        })
        .call(redrawPolygon);
}

function redrawPolygon(polygon) {
  polygon
      .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}