if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function button(width, height) {
        this.initialize(width, height);
    }
    (function (obj) {
        var p = button.prototype = new createjs.Container();
        
        p.Container_initialize = p.initialize;
        p.buttonTop = undefined;
        p.buttonBase = undefined;
        p.buttonPressHeight = 0;
        p.buttonDX = undefined;
        
        p.initialize = function () {
            this.Container_initialize(); //Initialize the container.
            this.mouseChildren = false;
            this.mouseEnabled = true;
            this.name = "gdc_button"; //Set default name
            
            this.buttonDX = {width: 0, height: 0};
            
            this.buttonBase = new createjs.Container();
            this.addChild(this.buttonBase);
            
            this.buttonTop = new createjs.Container();
            this.addChild(this.buttonTop);
            
            this.on("pressup", this.onMouseUp, this);
            this.on("mousedown", this.onMouseDown, this);
            this.on("mouseover", this.onMouseOver, this);
            this.on("mouseout", this.onMouseOut, this);
            
        };
        
        p.setupGenericButton = function (a_width, a_height, a_buttonColor, a_buttonBGColor, a_pressHeight) {
            var shortestSide, cornerRad, g, hitbox, sizeOffsetVal, cc;
            
            this.buttonDX.width = a_width;
            this.buttonDX.height = a_height;
            
            shortestSide = (a_width >= a_height) ? a_width : a_height;
            cornerRad = (shortestSide > 30 * 2) ? 30 : shortestSide / 2;
            
            cc = bgUtils.color.combine(a_buttonColor, a_buttonBGColor);
            
            this.buttonSquare2 = new createjs.Shape();
            g = this.buttonSquare2.graphics;
            g.beginFill(cc).drawRoundRect(0, 0, a_width, a_height, cornerRad);
            this.buttonSquare2.regX = a_width / 2;
            this.buttonSquare2.regY = a_height / 2;
            this.buttonTop.addChild(this.buttonSquare2);
            
            sizeOffsetVal = (a_width < a_height) ? a_width * 0.05 : a_height * 0.05;
            
            this.buttonSquare1 = new createjs.Shape();
            g = this.buttonSquare1.graphics;
            g.beginFill(a_buttonColor).drawRoundRect(0, 0, a_width - sizeOffsetVal, a_height - sizeOffsetVal, cornerRad);
            this.buttonSquare1.regX = (a_width - sizeOffsetVal) / 2;
            this.buttonSquare1.regY = (a_height - sizeOffsetVal) / 2;
            this.buttonTop.addChild(this.buttonSquare1);
            
            if (typeof a_buttonBGColor !== "undefined") {
                
                cc = bgUtils.color.combine(a_buttonBGColor, "#000000", 0.3);
                
                this.buttonBaseSquare1 = new createjs.Shape();
                g = this.buttonBaseSquare1.graphics;
                g.beginFill(cc).drawRoundRect(0, 0, a_width, a_height, cornerRad);
                this.buttonBaseSquare1.regX = a_width / 2;
                this.buttonBaseSquare1.regY = a_height / 2;
                this.buttonBase.addChild(this.buttonBaseSquare1);
                
                this.buttonBaseSquare2 = new createjs.Shape();
                g = this.buttonBaseSquare2.graphics;
                g.beginFill(a_buttonBGColor).drawRoundRect(0, 0, a_width, a_height - sizeOffsetVal, cornerRad);
                this.buttonBaseSquare2.regX = a_width / 2;
                this.buttonBaseSquare2.regY = (a_height - sizeOffsetVal) / 2;
                this.buttonBase.addChild(this.buttonBaseSquare2);
                
                this.buttonTop.y = -a_pressHeight / 2;
                this.buttonBase.y = a_pressHeight / 2;
                this.buttonPressHeight = a_pressHeight;
                
                //Setups up a hitbox that won't move so that when 
                // the player mouses over and the top drepresses
                //  slightly it won't change whether the mouseover
                //   continues to register 
                hitbox = new createjs.Shape();
                hitbox.graphics.beginFill("red").drawRoundRect(0, 0, a_width, a_height, cornerRad);
                hitbox.regX = a_width / 2;
                hitbox.regY = a_height / 2;
                hitbox.y = -a_pressHeight / 2;
                this.hitArea = hitbox;
            }
        };
        
        p.setupTextButton = function (a_width, a_height, a_text, a_font, a_textColor, a_buttonColor, a_buttonBGColor, a_pressHeight) {
            var tb, biggestOverage;
            
            this.setupGenericButton(a_width, a_height, a_buttonColor, a_buttonBGColor, a_pressHeight);
            
            if (typeof this.buttonText === "undefined") {
                this.buttonText = new createjs.Text(a_text, a_font, a_textColor);
                tb = this.buttonText.getBounds();
                this.buttonText.regX = tb.width / 2;
                this.buttonText.regY = tb.height / 2;
                this.buttonTop.addChild(this.buttonText);

                //Shrinks text if needed so that it fits with a space 90% as large as the button.
                this.resizeObjectToFitInBox(a_width * 0.9, a_height * 0.9, tb.width, tb.height, this.buttonText);
            } else {
                this.changeButtonText(a_text, a_font);
            }
        };
        
        p.changeButtonText = function (a_text, a_font) {
            if (typeof this.buttonText !== "undefined") {
                var changed, dx, tb;
                changed = false;
                if (typeof a_text !== "undefined") {
                    if (this.buttonText.text !== a_text) {
                        this.buttonText.text = a_text;
                        changed = true;
                    }
                }
                if (typeof a_font !== "undefined") {
                    this.buttonText.font = a_font;
                    changed = true;
                }
                if (changed) {
                    this.buttonText.scaleX = this.buttonText.scaleY = 1;
                    tb = this.buttonText.getBounds();
                    this.buttonText.regX = tb.width / 2;
                    this.buttonText.regY = tb.height / 2;
                    if (this.buttonDX.height > 0) {
                        this.resizeObjectToFitInBox(this.buttonDX.width * 0.9, this.buttonDX.height * 0.9, tb.width, tb.height, this.buttonText);
                    }
                }
            }
        };
            
        p.resizeObjectToFitInBox = function (a_boxWidth, a_boxHeight, a_objWidth, a_objHeight, object) {
            if (a_objWidth / a_boxWidth > a_objHeight / a_boxHeight) {
                if (a_objWidth / a_boxWidth > 1) {
                    object.scaleX = object.scaleY = a_boxWidth / a_objWidth;
                } else {
                    object.scaleX = object.scaleY = 1;
                }
            } else {
                if (a_objHeight / a_boxHeight > 1) {
                    object.scaleX = object.scaleY = a_boxWidth / a_objWidth;
                } else {
                    object.scaleX = object.scaleY = 1;
                }
            }
        };
        
        p.setupImageButton = function () {
            
        };
        
        p.setClickBehavior = function (a_function, a_parameters, a_target) {
            this.clickBehavior = {func: a_function, params: a_parameters, targ: a_target};
        };
        
        p.clearClickBehavior = function () {
            this.clickBehavior = undefined;
        };

        p.onMouseOver = function (e) {
            this.buttonTop.y = -this.buttonPressHeight * 0.375;
            //console.log(this.name + ": Mouse Over");
        };

        p.onMouseOut = function (e) {
            this.buttonTop.y = -this.buttonPressHeight / 2;
            //console.log(this.name + ": Mouse Out");
        };
            
        p.onMouseDown = function (e) {
            this.buttonTop.y = 0;
            //console.log(this.name + ": Mouse Down");
        };
            
        p.onMouseUp = function (e) {
            this.buttonTop.y = -this.buttonPressHeight * 0.375;
            if (this.clickBehavior) {
                this.clickBehavior.func.apply(this.clickBehavior.targ, this.clickBehavior.params);
                //console.log(this.name + ": Run click behavior");
            } else {
                //console.log(this.name + ": Button clicked but no behavior to run");
            }
        };
        
    }(scope));
    scope.button = button;
}(gdc));