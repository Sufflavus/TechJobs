(function() {
    var svg = d3.select("svg"),
        width = +svg.attr("width");
    
    var format = d3.format(",d");
    
    var color = d3.scaleOrdinal(d3.schemeCategory20c);
    
    var pack = d3.pack()
        .size([width, width])
        .padding(1.5);
    
    d3.json("/public/js/data.json", function(d) {
        var items = d.item;
        var skills = items.reduce(function(array, item) {
            return array.concat(item.category);
        }, []);
        var result = skills.reduce(function(array, i) {
            var key = i;
    
            var hasKey = array.some(function(item) {
                return item.id === key ? ((item.value++), true) : false;
            });
    
            if(!hasKey){
                array.push({id: key, value: 1});
            }
    
            return array;
        }, []);
        
        var classes = result.slice().sort(function(item1, item2) {
            return item2.value - item1.value;
        }).slice(0, 100);
        
        var root = d3.hierarchy({children: classes})
          .sum(function(d) { return d.value; });
    
          var node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        
          node.append("circle")
              .attr("id", function(d) { return d.id; })
              .attr("r", function(d) { return d.r; })
              .style("fill", function(d, i) { return color(i); });
        
          node.append("text")
              .attr("x", 0)
              .text(function(d) { return d.data.id; });
        });
})();