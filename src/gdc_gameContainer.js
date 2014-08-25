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
        };

        p.gameField = undefined;
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.gameContainer = gameContainer;
}(gdc));