hexagonMath = {};

hexagonMath.CalcHexCorner = function (CenterX, CenterY, Angle, Width) {
    var cornerPoint = Math.rotatePoint(CenterX + Width, CenterY, CenterX, CenterY, Angle);
    return cornerPoint;
};

hexagonMath.CalcHexSideMidPointSlider = function (CenterX, CenterY, Angle1, Angle2, Width, Slider) {
    if (typeof Slider === "undefined") {
        Slider = 0.5;
    }
    var corner1, corner2, midpoint;
    corner1 = hexagonMath.CalcHexCorner(CenterX, CenterY, Angle1, Width);
    corner2 = hexagonMath.CalcHexCorner(CenterX, CenterY, Angle2, Width);
    midpoint = Math.midpointSlide(corner1.x, corner1.y, corner2.x, corner2.y, Slider);
    return midpoint;
};

hexagonMath.GenerateCornerAnglesArray = function (InitAngle) {
    var i, angles;
    angles = [];
    for (i = 0; i < 6; i += 1) {
        angles.push(InitAngle + (i * 60));
    }
    return angles;
};

hexagonMath.Hexagon = function (CenterX, CenterY, Width, Angle) {
    this.center = {x: CenterX, y: CenterY};
    this.width = Width;
    this.cornerAngles = hexagonMath.GenerateCornerAnglesArray(Angle);
};

hexagonMath.Hexagon.prototype.calcCornerXY = function (Corner) {
    if (Corner >= this.cornerAngles.length) {
        return undefined;
    } else {
        return hexagonMath.CalcHexCorner(this.center.x, this.center.y, this.cornerAngles[Corner], this.width);
    }
};

hexagonMath.Hexagon.prototype.draw = function (createjsShape, Color, Fill) {
    var cornerPoint, corner;
    
    corner = 0;
    
    cornerPoint = this.calcCornerXY(corner);
    createjsShape.graphics.moveTo(cornerPoint.x, cornerPoint.y);
    
    if (typeof Color !== "undefined") {
        createjsShape.graphics.beginStroke(Color);
    }
    if (typeof Fill !== "undefined") {
        createjsShape.graphics.beginFill(Color);
    }
    
    while (corner < 5) {
        corner += 1;
        cornerPoint = this.calcCornerXY(corner);
        createjsShape.graphics.lineTo(cornerPoint.x, cornerPoint.y);
    }
    
    corner = 0;
    cornerPoint = this.calcCornerXY(corner);
    createjsShape.graphics.lineTo(cornerPoint.x, cornerPoint.y);
    createjsShape.graphics.endFill().endStroke();
};

hexagonMath.Hexagon.prototype.getClosestSide = function (X, Y) {
    var angleToCenter = Math.getAngle(this.center.x, this.center.y, X, Y);
    var side = 5;
    while (angleToCenter < this.cornerAngles[side] + 60) {
        
    }
};

hexagonMath.testVal = {x: 20, y: 20};
hexagonMath.testVal2 = hexagonMath.CalcHexSideMidPointSlider(hexagonMath.testVal.x, hexagonMath.testVal.y, -30, 30, 100, 0.5);
console.log("Hexagon Test Value Output: " + hexagonMath.testVal2);