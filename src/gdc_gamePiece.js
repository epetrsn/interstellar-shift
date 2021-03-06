if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gamePiece(unitData, HitAreaRadius) {
        this.initialize(unitData, HitAreaRadius);
    }
    (function (obj) {
        var p = gamePiece.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        p.team = undefined;
        p.mode = 0;
        p.body = undefined;
        p.body_glow = undefined;
        p.change_glow = undefined;
        
        p.initialize = function (unit, HitAreaRadius) {
            this.Container_initialize();
            
            this.name = "gamePiece";
            //this.setHitAreaCircle(HitAreaRadius);
            this.mouseChildren = false;
            this.mouseEnabled = true;
            
            if (unit) {
                this.team = unit.owner.color;
                this.unit = unit;
            } else {
                this.team = "red";
                this.mode = 0;
                this.unit = null;
            }
            this.on('tick', this.onTick);
            
            this.on("mousedown", this.onMouseDown);
            this.on("pressmove", this.onDrag);
            this.on("pressup", this.onDragRelease);
            
            this.setupImages();
        };
        
        p.setupImages = function () {
            var b;
            
            if (typeof this.change_glow === "undefined") {
                b = {x: gdc.gamePieceData.gp_Glow_Overlay.width, y: gdc.gamePieceData.gp_Glow_Overlay.height};
                
                this.change_glow = new createjs.Bitmap(gdc.gamePieceData.gp_Glow_Overlay);
                this.change_glow.regX = b.x / 2;
                this.change_glow.regY = b.y / 2;
                this.change_glow.alpha = 0;
                this.addChild(this.change_glow);
            } else {
                this.removeChild(this.change_glow);
                this.addChild(this.change_glow);
            }
            
            b = {x: gdc.gamePieceData.gp_width, y: gdc.gamePieceData.gp_height};
            
            if (typeof this.body !== undefined) {
                this.removeChild(this.body);
            }
            
            this.body = new createjs.Sprite(gdc.gamePieceData.gp_SpriteSheets[this.team], this.mode);
            this.body.regX = b.x / 2;
            this.body.regY = b.y / 2;
            this.addChild(this.body);
            
            if (typeof this.body_glow === "undefined") {
                this.body_glow = new createjs.Sprite(gdc.gamePieceData.gp_Glow_SpriteSheet, this.mode);
                this.body_glow.regX = b.x / 2;
                this.body_glow.regY = b.y / 2;
                this.body_glow.alpha = 0;
                this.addChild(this.body_glow);
            } else {
                this.removeChild(this.body_glow);
                this.addChild(this.body_glow);
            }
        };
        
        //WARING: VVV Does not work for hitTest() only works for mouseInteractions and getObjectsUnderPoint VVV
        p.setHitAreaCircle = function (Radius) {
            var circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, Radius);
            this.hitArea = circle;
        };
        
        p.changeTeam = function (Color) {
            if (typeof Color !== "undefined") {
                this.team = Color;
            } else {
                this.team = "red";
            }
            this.setupImages();
        };
        
        p.changeMode = function (NewMode, Duration) {
            if (NewMode !== this.mode) {
                if (typeof Duration === "undefined") {
                    Duration = 0;
                }
                
                this.mode = NewMode;
                createjs.Tween.removeTweens(this.body_glow);
                this.body_glow.alpha = 0;
                createjs.Tween.removeTweens(this.change_glow);
                this.change_glow.alpha = 0;

                if (Duration === 0) {
                    this.body.gotoAndStop(NewMode);
                    this.body_glow.gotoAndStop(NewMode);
                } else {
                    var step2;
                    
                    step3 = function (Dur) {
                        this.body.gotoAndStop(this.mode);
                        this.body_glow.gotoAndStop(this.mode);
                        
                        createjs.Tween.removeTweens(this.body_glow);
                        
                        createjs.Tween.get(this.body_glow).to({alpha: 1}, Dur * 0.25).call(function (Dur) {
                            createjs.Tween.get(this.body).to({alpha: 1}, Dur * 0.25);
                        }, [Dur], this);
                        createjs.Tween.get(this.body_glow).wait(Dur * 0.25).to({alpha: 0}, Dur * 0.25);
                        
                        createjs.Tween.removeTweens(this.change_glow);
                        createjs.Tween.get(this.change_glow).to({alpha: 0}, Dur / 2);
                        
                        createjs.Tween.removeTweens(this.body);
                    };
                    
                    step2 = function (Dur) {
                        createjs.Tween.get(this.body_glow).to({alpha: 0}, Dur * 0.125);
                    };
                    
                    createjs.Tween.get(this.body_glow).to({alpha: 1}, Duration * 0.375).call(step2, [Duration], this);
                    createjs.Tween.get(this.change_glow).to({alpha: 1}, Duration / 2).call(step3, [Duration], this);
                    createjs.Tween.get(this.body).to({alpha: 0}, Duration / 2);
                    
                }
            }
        };
        
        p.onTick = function (event) {
            var unit = this.unit;
            if (unit.propertyChanged) {
                if (this.team !== unit.owner.color) {
                    changeTeam(unit.owner.color);
                }
                this.changeMode(unit.mode.frame);
                unit.propertyChanged = false;
                if (!this.isDragging) {
                    var node = (unit.targetLocation || unit.location);
                    var coords = MapUtil.axialToCartesian(node.q, node.r, GameConst.HEXAGON_SIZE);
                    this.x = coords.x;
                    this.y = coords.y;
                }
            }
        };
        
        p.onMouseDown = function (e) {
            this._dragOffsetX = e.stageX;
            this._dragOffsetY = e.stageY;
            this.isDragging = true;
        };
        
        p.onDragRelease = function (e) {
            this.isDragging = false;
            
            var dropE = new createjs.Event("unitDropped");
            this.dispatchEvent(dropE);
            
            this.unit.propertyChanged = true;
            console.log("Drag released: " + !this.isDragging);
        };

        p.onDrag = function (e) {
            this.x += e.stageX - this._dragOffsetX;
            this.y += e.stageY - this._dragOffsetY;
            this._dragOffsetX = e.stageX;
            this._dragOffsetY = e.stageY;
        };
        
    }(scope));
    scope.gamePiece = gamePiece;
}(gdc));

gdc.gamePieceData = {
    totalStates: 3,
    gp_width: 313,
    gp_height: 318,
    gp_clickRadius: 300,
    resolutionMulti: 1,
    gp_SpriteSheets: {},
    gp_ColorNames: ["red", "blue", "green", "purple", "yellow"],
    gp_Outline_SpriteSheet: undefined,
    gp_Glow_SpriteSheet: undefined,
    gp_Glow_Overlay: undefined,
    setupGamePieceImages: function () {
        //Setup the game piece images (as sprite sheets).
        var data, cname, i;
        for (i = 0; i < this.gp_ColorNames.length; i += 1) {
            cname = this.gp_ColorNames[i];
            data = {
                framerate: 2,
                images: [Game.queue.getResult("gp_" + cname)],
                frames: {width: this.gp_width, height: this.gp_height}
            };
            this.gp_SpriteSheets[cname] = new createjs.SpriteSheet(data);
        }
        
        //Setup the glow (white) gamepiece overlay image (as a sprite sheet).
        data = {
            framerate: 2,
            images: [Game.queue.getResult("gp_glow")],
            frames: {width: this.gp_width, height: this.gp_height}
        };
        this.gp_Glow_SpriteSheet = new createjs.SpriteSheet(data);
        
        //Setup the gamepiece outline image (as a sprite sheet).
        data = {
            framerate: 2,
            images: [Game.queue.getResult("gp_outline")],
            frames: {width: this.gp_width + 20, height: this.gp_height + 20} //The outline has 10px stroke.
        };
        this.gp_Outline_SpriteSheet = new createjs.SpriteSheet(data);
        
        //Retrieve glow overlay image
        this.gp_Glow_Overlay = Game.queue.getResult("gp_glowCover");
    }
};
