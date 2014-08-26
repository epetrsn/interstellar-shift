/*
 * Game Logic
 */
GameLogic = {
	initGameState: function (gameState, config, gameContainer) {
		// Create Map. Fixed at size 2. DO NOT CHANGE
		gameState.map.initialize(2);
		MapLogic.renderMap(gameState.map, gameContainer);
		// TODO: This should probably check if the players array is empty. If not, destroy old players.
		gameState.players = [];
		// Create player state instances
		var numPlayers = config.numPlayers || 2;
		var i, player;
		for (i = 0; i < numPlayers; i += 1) {
			player = new Player(GameConst.PLAYER_COLORS[i]);
			gameState.players.push(player);
			this.initPlayerUnits(player, gameState.map.getStartingNode(i, numPlayers), gameContainer);
		}
	},
	initPlayerUnits: function (player, node, gameContainer) {
		if (!node) {
			throw new Error('Player');
		}
		// Directly setting mode should only be done during init
		this.createUnit(player, node, GameConst.UNIT_MODES.SPAWN, gameContainer);
	},
	// Creates a unit, attaches to a location, adds display to the gamefield
	createUnit: function (player, spawnLocation, initialMode, gameContainer) {
		var unit = new Unit(player, initialMode);
		unit.location = spawnLocation;
		unit.display = gameContainer.gamefield.addGameUnit(unit); //new gdc.gamePiece(unit);
		unit.display.scaleX = 0.1;
		unit.display.scaleY = 0.1;
		//gameContainer.gamefield.addChild(unit.display);
		return unit;
	}
    //Moved renderMap() to MapLogic{object} created in map_logic.js
};