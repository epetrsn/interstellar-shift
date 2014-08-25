if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gameNode(HitAreaRadius, nodeData, color) {
        this.initialize(HitAreaRadius, nodeData, color);
    }
    (function (obj) {
        var p = gameNode.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
        p.initialize = function (HitAreaRadius, nodeData, color) {
            this.Container_initialize();
            this.nodeData = nodeData;
            this.name = "gameNode";
            this.radius = HitAreaRadius;
            this.setHitAreaCircle(HitAreaRadius);
            this.drawDebugInfo(color);

            this.on('click', this.onClick);
            this.on("tick", this.onTick);
        };
        //WARING: VVV Does not work for hitTest() only works for mouseInteractions and getObjectsUnderPoint VVV
        p.setHitAreaCircle = function (Radius) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, Radius);
            this.hitArea = circle;
        };

        p.drawDebugInfo = function (color, cost) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill(color || "red").drawCircle(0, 0, this.radius);
            this.addChild(circle);
            if (cost) {
                var text = new createjs.Text(cost.toString(), "12px Arial", "#fff"); text.x = 0; text.y = 0; text.textBaseline = "alphabetic"; text.textAlign = "center";
            }
            this.addChild(text);
        };

        p.onClick = function (event) {
            console.info('Neighbors for', this.nodeData.toString());
            DebugState.costVersion++;
            var i, l, neighbors = [];
            NodeLogic.findAdjacent(this.nodeData, 0, 1, neighbors);
            for (i = 0, l = neighbors.length; i < l; i++) {
                var node = neighbors[i];
                console.info(node.toString());
            }
        };
        p.onTick = function (event) {
            var data = this.nodeData.data;
            if (data.version !== DebugState.costVersion || !data.cost) {
                this.version = DebugState.costVersion;
                this.removeAllChildren();
                var color = '#0000ff';
                this.drawDebugInfo(color);
            } else if (data.version !== this.version) {
                this.version = data.version;
                this.removeAllChildren();
                var color = '#' + ((data.cost * 20) + 16).toString(16) + ((data.cost * 20) + 16).toString(16) + 'ff';
                color = 'gray';
                console.debug('Color',color);
                this.drawDebugInfo(color, data.cost);
            } 
        };
        
    }(scope));
    scope.gameNode = gameNode;
}(gdc));