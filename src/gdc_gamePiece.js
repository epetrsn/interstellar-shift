if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gamePiece(HitAreaRadius) {
        this.initialize(HitAreaRadius);
    }
    (function (obj) {
        var p = gamePiece.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
        p.initialize = function (HitAreaRadius) {
            this.Container_initialize();
            
            this.name = "gamePiece";
            this.setHitAreaCircle(HitAreaRadius);
        };
        //WARING: VVV Does not work for hitTest() only works for mouseInteractions and getObjectsUnderPoint VVV
        p.setHitAreaCircle = function (Radius) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, Radius);
            this.hitArea = circle;
        };
        
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.gamePiece = gamePiece;
}(gdc));

