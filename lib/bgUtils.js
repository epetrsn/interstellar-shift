var bgUtils = {};

bgUtils.removeDuplicates = function (A, ArrayWithDuplicates) {
    var o, i, j, newArray;
    newArray = [];
    for (i = 0; i < A.length; i += 1) {
        o = A[i];
        if (typeof o !== "undefined") {
            j = ArrayWithDuplicates.indexOf(o);
        } else {
            j = -1;
        }
        if (j === -1) {
            newArray.push(o);
        }
    }
    return newArray;
};

bgUtils.color = {};

bgUtils.color.addHexColor = function (c1, c2) {
    var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
};

bgUtils.color.subtractHexColor = function (c1, c2) {
    var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
};

bgUtils.color.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

bgUtils.color.rgbToHex = function (r, g, b) {
    return "#" + bgUtils.color.componentToHex(r) + bgUtils.color.componentToHex(g) + bgUtils.color.componentToHex(b);
};

bgUtils.color.hexToRgb = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex, result;
    
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex,
        function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

bgUtils.color.combine = function (colorHex1, colorHex2, sliderVal) {
    var cRGB1, cRGB2, cRGB_new, inv_sliderVal;
    
    if (typeof sliderVal === "undefined") {
        sliderVal = 0.5;
    }
    
    inv_sliderVal = 1 - sliderVal;
    
    cRGB1 = bgUtils.color.hexToRgb(colorHex1);
    cRGB2 = bgUtils.color.hexToRgb(colorHex2);
    
    cRGB_new = {
        r: Math.floor(cRGB1.r * inv_sliderVal + cRGB2.r * sliderVal),
        g: Math.floor(cRGB1.g * inv_sliderVal + cRGB2.g * sliderVal),
        b: Math.floor(cRGB1.b * inv_sliderVal + cRGB2.b * sliderVal)
    };
    
    console.log("New colors: " + cRGB_new.r + ", " + cRGB_new.g + ", " + cRGB_new.b);
    
    return bgUtils.color.rgbToHex(cRGB_new.r, cRGB_new.g, cRGB_new.b);
};