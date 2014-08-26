if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gameContainer(width, height) {
        this.initialize(width, height);
    }
    (function (obj) {
        var p = gameContainer.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;

        p.gameField = undefined;
        p.containerDX = undefined;
        
        p.initialize = function (a_width, a_height) {
            this.Container_initialize(); //Initialize the container.
            // this.mouseChildren = true;
            // this.mouseEnabled = true;
            this.name = "gdc_gameContainer"; //Set default name
            this.containerDX = {width: a_width, height: a_height};
            
            this.on("tick", this.onTick);

            this.gamefield = new gdc.gameField();
            this.addChild(this.gamefield);
            
            // Create New GameState
            var gameState = new GameState();
            GameLogic.initGameState(gameState, {numPlayers: 2}, this);
            
            //NOTICE - Move this late
            // gameContainer is currently being used as a Game.activeState, it should not be a top-level Game.activeState
            // Once you create the container for instances of gameContainer copy the below commands to it.
            Game.sound.playSong("gameSong")
            Game.setBackgroundColor("black");
            //-End notice
        };
        
        p.setGameFieldDX = function (a_width, a_height, dontCenter) {
            this.gamefield.fieldDX.width = a_width;
            this.gamefield.fieldDX.height = a_height;
            
            if (dontCenter !== true) {
                this.centerGameField();
            }
        };
        
        p.centerGameField = function () {
            this.gamefield.x = this.containerDX.width / 2
            this.gamefield.y = this.containerDX.height / 2
        };
        
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.gameContainer = gameContainer;
}(gdc));