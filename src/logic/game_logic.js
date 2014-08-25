/*
 * Game Logic
 */
GameLogic = {
	initGameState: function (gameState, config) {
		// Create Map. Fixed at size 2. DO NOT CHANGE
		gameState.map.initialize(2);
		GameLogic.renderMap(gameState.map);
		// TODO: This should probably check if the players array is empty. If not, destroy old players.
		gameState.players = [];
		// Create player state instances
		var numPlayers = config.numPlayers || 2;
		var i, player;
		for (i = 0; i < numPlayers; i++) {
			player = new Player(GameConst.PLAYER_COLORS[i]);
			gameState.players.push(player);
			this.initPlayerUnits(player, gameState.map.getStartingNode(i, numPlayers));
		}
	},
	initPlayerUnits: function (player, node) {
		if (!node) {
			throw new Error('Player');
		}
		// Directly setting mode should only be done during init
		this.createUnit(player, node, GameConst.UNIT_MODES.SPAWN);
	},
	// Creates a unit, attaches to a location, adds display to the gamefield
	createUnit: function (player, spawnLocation, initialMode) {
		var unit = new Unit(player, initialMode);
		unit.location = spawnLocation;
		unit.display = new gdc.gamePiece(unit);
		unit.display.scaleX = 0.1;
		unit.display.scaleY = 0.1;
		Game.gamecontainer.gamefield.addChild(unit.display);
		return unit;
	},
	// TODO: This method should probably be in a different file
	renderMap: function (map) {
		var i, j, l, n, node, nodes, tile, tiles = map.tiles;
		var dispObj, hexagonSize = GameConst.HEXAGON_SIZE, radius;
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
				dispObj = new gdc.gameNode(radius, node, 'gray');
				// Position in container. May need additional offsets.
				var coords = MapUtil.axialToCartesian(node.q, node.r, hexagonSize);
				dispObj.x = coords.x;
				dispObj.y = coords.y;
				Game.gamecontainer.gamefield.addChild(dispObj);
			}
		}
	}
};