if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gameNode(HitAreaRadius, color) {
        this.initialize(HitAreaRadius, color);
    }
    (function (obj) {
        var p = gameNode.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
        p.initialize = function (HitAreaRadius, color) {
            this.Container_initialize();
            
            this.name = "gameNode";
            // this.setHitAreaCircle(HitAreaRadius);
            var circle = new createjs.Shape();
            circle.graphics.beginFill(color || "red").drawCircle(0, 0, HitAreaRadius);
            this.addChild(circle);
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
    scope.gameNode = gameNode;
}(gdc));