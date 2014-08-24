Math.TO_DEG = 180 / Math.PI;
Math.TO_RAD = Math.PI / 180;

Math.getAngle = function (CenterX, CenterY, EndX, EndY) {
    var dy, dx, theta;
    dy = EndY - CenterY;
    dx = EndX - CenterX;
    theta = Math.atan2(dy, dx);
    theta *= Math.TO_DEG; // rads to degs
    return theta;
};

//Rotate an arbitrary point around a central point
Math.rotatePoint = function (PointX, PointY, CenterX, CenterY, angle) {
    var sinAng, cosAng, p = {x: 0, y: 0};
    
    angle = -angle;
    angle *= Math.TO_RAD;
    
    PointX -= CenterX;
    PointY -= CenterY;
    
    sinAng = Math.sin(angle);
    cosAng = Math.cos(angle);
    
    p.x =  (PointX * cosAng) - (PointY * sinAng) + CenterX;
    p.y =  -(PointX * sinAng) - (PointY * sinAng) + CenterY;
    
    return p;
};

//Rotate an arbitrary point around 0,0
Math.rotatePointSimple = function (PointX, PointY, angle) {
    var sinAng, cosAng, p = {x: 0, y: 0};
    
    angle = -angle;
    angle *= Math.TO_RAD;
    
    sinAng = Math.sin(angle);
    cosAng = Math.cos(angle);
    
    p.x =  (PointX * cosAng) - (PointY * sinAng);
    p.y =  -(PointX * sinAng) - (PointY * sinAng);
    
    return p;
};

Math.distance = function (x1, y1, x2, y2) {
    var distX, distY;
    distX = x2 - x1;
    distY = y2 - y1;
    return Math.sqrt((distX * distX) + (distY * distY));
};

Math.distanceSqr = function (x1, y1, x2, y2) {
    var distX, distY;
    distX = x2 - x1;
    distY = y2 - y1;
    return (distX * distX) + (distY * distY);
};

Math.midpoint = function (x1, y1, x2, y2) {
    var p = {x:(x1 + x2)/2, y:(y1 + y2)/2};
    return p;
};

Math.midpointSlide = function (x1, y1, x2, y2, sliderVal) {
    var sliderInv = 1 - sliderVal;
    var p = {x:(x1 * sliderInv) + (x2 * sliderVal), y:(y1 * sliderInv) + (y2 * sliderVal)};
    return p;
};