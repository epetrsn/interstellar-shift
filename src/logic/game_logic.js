/*
 * Game Logic
 */
GameLogic = {
	initGameState: function (gameState, config) {
		// Create Map. Fixed at size 2. DO NOT CHANGE
		gameState.map.initialize(2);

		// Create player state instances
		var numPlayers = config.numPlayers || 2;
		var i, player;
		for (i = 0; i < numPlayers; i++) {
			player = new Player(GameConst.PLAYER_COLORS[i]);
			gameState.players.push(player);
			gameState.map.getStartingNode(i, numPlayers);
			player
		}
	},
	initPlayerUnits: function (player, node) {
		
	}
};