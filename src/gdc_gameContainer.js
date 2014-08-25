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
            this.map.initialize(1);
            this.addMapDisplay(this.gamefield, this.map);
        };
        
        p.addMapDisplay = function (target, map) {
            var i, j, l, n, node, nodes, tile, tiles = map.tiles;
            var container, hexagonSize = 20, radius, spacing = 20, columns;
            columns = Math.floor(target.gfWidth/(2*spacing));
            console.debug('addMapDisplay for',map.tiles.length,'tile(s)',columns, spacing, radius, target);
            var planetNodes = 0;
            var planetTiles = 0;
            var step = 0;
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
                    if (node.isPlanet) {
                        planetNodes++;
                    }
                    radius = (.6*(step/16) + 1*((16-step)/16))*(node.isPlanet ? hexagonSize/2 : hexagonSize/3);

                    container = new gdc.gameNode(radius, '#'+'00'+color.toString(16)+color.toString(16));
                    var coords = MapUtil.axialToCartesian(tile.q, tile.r, hexagonSize);
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