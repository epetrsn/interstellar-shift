//FILE CONTAINS NODE AND MAP LOGIC

/*
 * Node Logic
 */

NodeLogic = {
	// buggy beyond dist 1
	findAdjacent: function (node, minCost, maxCost, found, visited, depth) {
		visited = visited || {};
		depth = depth || 0;
		if (node.data.version !== DebugState.costVersion || node.data.cost > depth) {
			node.data.cost = depth;
			node.data.version = DebugState.costVersion;
		}
		
		visited[node.key] = true;
		if (minCost < 0) {
			found.push(node);
		}
		if (maxCost <= 0) {
			return;
		}
		var i, l, nodes = node.nodes;
		for (i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (!visited[node.key]) {
				this.findAdjacent(node, minCost - 1, maxCost - 1, found, visited, depth + 1);
			}
		}
	}
};

/*
 * Map Logic
 */

MapLogic = {
    // TODO: This method should probably be in a different file
	renderMap: function (map, gameContainer) {
		var i, j, l, n, node, nodes, tile, tiles;
		var dispObj, hexagonSize, radius;
        
        tiles = map.tiles;
        hexagonSize = GameConst.HEXAGON_SIZE;
        
		console.info('addMapDisplay for',map.tiles.length,'tile(s)');
		
        // Duplicate node prevention
		var observedNodes = {};
        
		for (i = 0, l = tiles.length; i < l; i++) {
			tile = tiles[i];
			nodes = tile.nodes;
			for (j = 0, n = nodes.length; j < n; j++) {
				node = nodes[j];
				if (observedNodes[node.key]) {
					continue;
				}
				observedNodes[node.key] = node;
				// TODO: Add real graphics for space and planet nodes
				radius = node.isPlanet ? hexagonSize/1.2 : hexagonSize/4;
				dispObj = gameContainer.gamefield.addNode(radius, node, 'gray');
				// Position in container. May need additional offsets.
				var coords = MapUtil.axialToCartesian(node.q, node.r, hexagonSize);
				dispObj.x = coords.x;
				dispObj.y = coords.y;
				//gameContainer.gamefield.addChild(dispObj);
			}
		}
        
        //Set the dimensions of the game field before adding game pieces
        var gfb = gameContainer.gamefield.getBounds();
        console.log("Getting dx for " + gameContainer.gamefield + ": " + gfb);
        gameContainer.setGameFieldDX(gfb.width, gfb.height);
	}
};