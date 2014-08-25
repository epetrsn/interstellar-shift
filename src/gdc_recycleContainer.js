if (typeof gdc === "undefined") {
    gdc = {};
}

(function (scope) {
    function recycleContainer(NumberOfInternalObjects, ObjectType) {
        this.initialize(NumberOfInternalObjects, ObjectType);
    }
    (function (obj) {
        var p = recycleContainer.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
        
        p.particleTypes = ["Shapes", "Bitmaps", "Custom"];
        p.particleType = undefined;
        p.inactiveObjects = undefined;
        p.activeObjects = undefined;
        
        p.initialize = function (NumberOfInternalObjects, ObjectType) {
            this.Container_initialize();
            
            if (typeof ObjectType === "undefined") {
                ObjectType = "Custom";
            }
            
            this.name = "recycleContainer";
            this.particleType = ObjectType;
            this.inactiveObjects = [];
            this.activeObjects = [];
            
            switch (ObjectType) {
            case "Shapes":
                this.setupParticlesShapes(NumberOfInternalObjects);
                break;
            case "Bitmaps":
                this.setupParticlesBitmaps(NumberOfInternalObjects);
                break;
            default:
                //Do nothing for now.
                break;
            }
            
        };
        
        p.getNextInactiveObj = function () {
            var nextActive;
            
            if (this.inactiveObjects.length === 0) {
                switch (ParticleType) {
                case "Shapes":
                    nextActive = new createjs.Shape();
                    break;
                case "Bitmaps":
                    nextActive = new createjs.Bitmap();
                    break;
                case "Custom":
                    nextActive = undefined;
                    break;
                }
            } else {
                nextActive = this.inactiveObjects.shift();
            }
            
            if (typeof nextActive !== "undefined") {
                this.activeObjects.push(nextActive);
                this.addChild(nextActive);
            }
            return nextActive;
        };
        
        p.deactivateObj = function (ActiveObj) {
            this.removeChild(ActiveObj);
            var i;
            i = this.activeObjects.indexOf(ActiveObj);
            if (i >= 0) {
                this.activeObjects.splice(i, 1);
            }
            this.inactiveObjects.push(ActiveObj);
        };
        
        p.addObjToContainer = function (Obj) {
            this.inactiveObjects.push(Obj);
        };
        
        p.setupParticlesShapes = function (NumberOfParticles) {
            var i, obj;
            for (i = 0; i < NumberOfParticles; i += 1) {
                obj = new createjs.Shape();
                this.inactiveObjects.push(obj);
            }
        };
        
        p.setupParticlesBitmaps = function (NumberOfParticles) {
            var i, obj;
            for (i = 0; i < NumberOfParticles; i += 1) {
                obj = new createjs.Bitmap();
                this.inactiveObjects.push(obj);
            }
        };
        
        p.onTick = function (event) {
            
        };
        
    }(scope));
    scope.recycleContainer = recycleContainer;
}(gdc));