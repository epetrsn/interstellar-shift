var Game = {
    queue: null,
    stage: null,
    gamecontainer: null,
    runtime: 0,
    dx: {w: 495, h: 600},
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
        
        Game.ball = new createjs.Shape();
        Game.ball.graphics.beginFill("red").drawCircle(0, 0, 50);
        Game.ball.x = Game.ball.y = 100;
        
        Game.stage.addChild(Game.ball);
        
        Game.stage.update();
        
        
        console.log("Start Game");
        
        createjs.Ticker.on("tick", Game.tick);
    },
    tick: function (event) {
        Game.runtime += event.delta;
        Game.stage.update();
    },
    ball: undefined
}