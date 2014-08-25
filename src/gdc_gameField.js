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
            // this.mouseChildren = false;
            this.name = "gdc_gameField"; //Set default name
            
            this.on("tick", this.onTick);
            this.on("mousedown", this.onMouseDown);
            this.on("pressmove", this.onDrag);
            // this.on("pressup", this.onDrag);
            
            this.gfWidth = width;
            this.gfHeight = height;
        };
        
        p.gfWidth = 0;
        p.gfHeight = 0;
        
        p.onTick = function (event) {
            
        };

        p.onMouseDown = function (e) {
            this._dragOffsetX = e.stageX;
            this._dragOffsetY = e.stageY;
        };

        p.onDrag = function (e) {
            this.x += e.stageX - this._dragOffsetX;
            this.y += e.stageY - this._dragOffsetY;
            this._dragOffsetX = e.stageX;
            this._dragOffsetY = e.stageY;
        };
        
    }(scope));
    scope.gameField = gameField;
}(gdc));