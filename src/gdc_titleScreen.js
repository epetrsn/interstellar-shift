if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function titlescreen() {
        this.initialize();
    }
    (function (obj) {
        var p = titlescreen.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        
        p.initialize = function () {
            this.Container_initialize();
            
            this.name = "titlescreen";
            
            Game.setBackgroundColor("#ffffff");

            this.playButton = new gdc.button();
            this.playButton.setupTextButton(200, 100, "PLAY", "36px " + GameConst.FONT, "#ffffff", "#666666", "#222222", 20);
            this.playButton.x = (Game.dx.w) / 2;
            this.playButton.y = (Game.dx.h) / 2;
            
            this.addChild(this.playButton);

            this.playButton.setClickBehavior(this.onPlayButtonPressed, undefined, this);
        };
        
        p.onPlayButtonPressed = function () {
            this.playButton.changeButtonText("HAVE FUN!");
            createjs.Tween.get(this).wait(1000).call(this.switchToGameState, undefined, this);
            this.playButton.clearClickBehavior();
        };
        
        p.switchToGameState = function () {
            Game.switchActiveState(new gdc.gameContainer(Game.dx.w, Game.dx.h));
        };
        
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.titlescreen = titlescreen;
}(gdc));