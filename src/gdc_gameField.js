if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gameField() {
        this.initialize();
    }
    (function (obj) {
        var p = gameField.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        
        p.fieldDX = undefined;
        p.nodes = undefined;
        p.units = undefined;
        
        p.initialize = function () {
            this.Container_initialize(); //Initialize the container.
            
            this.name = "gdc_gameField"; //Set default name
            
            this.nodes = new createjs.Container();
            this.addChild(this.nodes);
            
            this.units = new createjs.Container();
            this.addChild(this.units);
            
            this.on("tick", this.onTick);
//            this.on("mousedown", this.onMouseDown);
//            this.on("pressmove", this.onDrag);
            // this.on("pressup", this.onDrag);
            
            this.fieldDX = {width: 0, height: 0};
            
            console.log("Game Field Container Created");
        };
        
        p.addNode = function (a_radius, a_nodeData, a_Color) {
            var newNode = new gdc.gameNode(a_radius, a_nodeData, a_Color);
            this.nodes.addChild(newNode);
            return newNode;
        };
        
        p.addGameUnit = function (a_unitData, a_hitArea) {
            var newPiece = new gdc.gamePiece(a_unitData, a_hitArea);
            
            newPiece.on("unitDropped", this.onUnitDropped, this);
            
            this.units.addChild(newPiece);
            return newPiece;
        };
        
        p.getNodeUnderMouse = function () {
            var m, node;
            
            m = {x: Game.stage.mouseX, y: Game.stage.mouseY};
            m = this.nodes.globalToLocal(m.x, m.y);
            
            node = this.nodes.getObjectUnderPoint(m.x, m.y);
            
            return node;
        };
        
        p.onUnitDropped = function (e) {
            var unit, node;
            unit = e.target;
            node = this.getNodeUnderMouse();
            if (node) {
                unit.unit.targetLocation = node.nodeData;
            }
        };
        
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