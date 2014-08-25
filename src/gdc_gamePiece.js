if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function gamePiece(Team, HitAreaRadius) {
        this.initialize(Team, HitAreaRadius);
    }
    (function (obj) {
        var p = gamePiece.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        p.team = undefined;
        p.mode = 0;
        p.body = undefined;
        p.body_glow = undefined;
        p.change_glow = undefined;
        
        p.initialize = function (Team, HitAreaRadius) {
            this.Container_initialize();
            
            this.name = "gamePiece";
            this.setHitAreaCircle(HitAreaRadius);
            
            if (typeof Team !== "undefined") {
                this.team = Team;
            } else {
                this.team = "red";
            }
            
            this.setupImages();
        };
        
        p.setupImages = function () {
            var b;
            
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
                    
                    step2 = function (Dur) {
                        this.body.gotoAndStop(this.mode);
                        this.body_glow.gotoAndStop(this.mode);
                        createjs.Tween.get(this.body_glow).to({alpha: 0}, Dur / 2);
                        createjs.Tween.removeTweens(this.change_glow);
                        createjs.Tween.get(this.change_glow).to({alpha: 0}, Dur / 2);
                    };
                    
                    createjs.Tween.get(this.body_glow).to({alpha: 1}, Duration / 2).call(step2, [Duration], this);
                    createjs.Tween.get(this.change_glow).to({alpha: 0.5}, Duration / 2);
                    
                }
            }
        };
        
        p.onTick = function (event) {
            
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
