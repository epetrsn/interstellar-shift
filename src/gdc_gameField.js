if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gameField(width, height) {
        this.initialize(width, height);
    }
    (function (obj) {
        var p = gameField.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        
        p.initialize = function (width, height) {
            this.Container_initialize(); //Initialize the container.
            
            this.name = "gdc_gameField"; //Set default name
            
            this.on("tick", this.onTick);
            
            this.gfWidth = width;
            this.gfHeight = height;
        }
        
        p.gfWidth = 0;
        p.gfHeight = 0;
        
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.gameField = gameField;
}(gdc));