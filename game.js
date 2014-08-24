var Game = {
    queue: null,
    stage: null,
    gamecontainer: null,
    runtime: 0,
    dx: {w: 495, h: 600},
    setBackgroundColor: function (color) {
        this.stage.canvas.parentElement.style.background = color;
    },
    preloadAssets: function () {
        console.log("Preload Game Assets");
        
        function handleComplete() {
            Game.start();
        }
        
        var manifest = [];
        
        if (manifest.length > 0) {
            Game.queue = new createjs.LoadQueue();

            Game.queue.installPlugin(createjs.Sound);
            Game.queue.on("complete", handleComplete, this);
            Game.queue.loadManifest(manifest);
        } else {
            handleComplete();
        }
    },
    start: function () {
        
        Game.stage = new createjs.Stage("gameCanvas");
        
        createjs.Ticker.setFPS(20);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Touch.enable(Game.stage, true, false);
        
        Game.gamecontainer = new gdc.gameContainer(Game.stage.canvas.parentElement.width, Game.stage.canvas.parentElement.height);
        Game.stage.addChild(Game.gamecontainer);
        
        Game.testHexagon = new createjs.Shape();
        Game.testHexagon.x = Game.testHexagon.y = 100;
        var hex = new hexagonMath.Hexagon(0, 0, 50, 30);
        hex.draw(Game.testHexagon, "#330000", "red", 2);
        
        Game.gamecontainer.gamefield.addChild(Game.testHexagon);
        
        Game.stage.update();
        
        
        console.log("Start Game");
        
        createjs.Ticker.on("tick", Game.tick);
        
        this.setBackgroundColor("black");
    },
    tick: function (event) {
        Game.runtime += event.delta;
        Game.stage.update();
        Game.testHexagon.y += 1;
    },
    testHexagon: undefined
}