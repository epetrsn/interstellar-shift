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
            
            this.initialColor = color;
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
            if (typeof this.debugCircle === "undefined") {
                this.debugCircle = new createjs.Shape();
                this.addChild(this.debugCircle);
            } else {
                this.debugCircle.graphics.clear();
            }
            
            this.debugCircle.graphics.beginFill(color || this.initialColor).drawCircle(0, 0, this.radius);
            this.setBounds(-this.radius, -this.radius, this.radius, this.radius);
            
            if (cost) {
                if (typeof this.debugText === "undefined") {
                    this.debugText = new createjs.Text("empty", "12px " + GameConst.FONT, "#fff");
                    this.addChild(this.debugText);
                } else {
                    this.debugText.visible = true;
                    //Probably not nessisary
                    this.debugText.font = "12px " + GameConst.FONT;
                    this.debugText.color = "#fff";
                }
                
                if (cost.toString() !== this.debugText.text) {
                    this.debugText.text = cost.toString();
                    this.debugText.x = 0;
                    this.debugText.y = 0;
                    this.debugText.textBaseline = "alphabetic";
                    this.debugText.textAlign = "center";
                    
                    //Cache the text for speeeeed
                    this.debugText.uncache();
                    var b = this.debugText.getBounds();
                    if (b) {
                        this.debugText.cache(b.x, b.y, b.width, b.height, 1);
                    }
                }
            } else {
                if (typeof this.debugText !== "undefined") {
                    this.debugText.visible = false;
                }
            }
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
                this.drawDebugInfo();
            } else if (data.version !== this.version) {
                this.version = data.version;
                this.drawDebugInfo('blue', data.cost);
            } 
        };
        
    }(scope));
    scope.gameNode = gameNode;
}(gdc));