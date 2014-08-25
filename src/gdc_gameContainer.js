if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) 
{    function gameContainer(width, height) {
        this.initialize(width, height);
    }
    (function (obj) {
        var p = gameContainer.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        
        p.initialize = function (width, height) {
            this.Container_initialize(); //Initialize the container.
            // this.mouseChildren = true;
            // this.mouseEnabled = true;
            this.name = "gdc_gameContainer"; //Set default name
            
            this.on("tick", this.onTick);
            
            

            this.gamefield = new gdc.gameField(width, height);
            this.addChild(this.gamefield);

            this.map = new Map();
            this.map.initialize(2);
            this.addMapDisplay(this.gamefield, this.map);
        };
        
        p.addMapDisplay = function (target, map) {
            var i, j, l, n, node, nodes, tile, tiles = map.tiles;
            var container, hexagonSize = 40, radius, spacing = 20, columns;
            columns = Math.floor(target.gfWidth/(2*spacing));
            console.info('addMapDisplay for',map.tiles.length,'tile(s)');
            var planetNodes = 0;
            var planetTiles = 0;
            var step = 0;
            var observedNodes = {};
            for (i = 0, l = tiles.length; i < l; i++) {
                step++;
                var color = ((16*step) % 223) + 32;
                tile = tiles[i];
                if (tile.isPlanet) {
                        planetTiles++;
                    }
                nodes = tile.nodes;
                for (j = 0, n = nodes.length; j < n; j++) {
                    node = nodes[j];
                    if (observedNodes[node.key]) {
                        continue;
                    }
                    observedNodes[node.key] = node;
                    if (node.isPlanet) {
                        planetNodes++;
                    }
                    var t1 = 1-(step%16)/16, t2 = (step%16)/16;
                    t1=1;t2=0;
                    radius = (t1 + 0.6*t2)*(node.isPlanet ? hexagonSize/1.2 : hexagonSize/4);
                    console.debug('t1',t1, 't2',t2, 'radius', radius);
                    container = new gdc.gameNode(radius, node, '#'+'00'+color.toString(16)+color.toString(16));
                    var coords = MapUtil.axialToCartesian(node.q, node.r, hexagonSize);
                    container.x = coords.x;
                    container.y = coords.y;
                    // container.x = 2*spacing*(i%columns) + 2*spacing - radius;
                    // container.y = 2*spacing*(Math.floor(i/columns)) + 2*spacing - radius;
                    target.addChild(container);
                }
            }
            console.info('Displaying',planetTiles,'planet tiles and',planetNodes,'planet nodes');
        };

        p.gameField = undefined;
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.gameContainer = gameContainer;
}(gdc));