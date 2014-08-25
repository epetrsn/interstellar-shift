if (typeof gdc === "undefined") {
    gdc = {};
}

gdc.buttonFunctions = {};

gdc.buttonFunction.addButtonFunctionality = function (a_createjs_obj) {
    a_createjs_obj = new createjs.Shape();
    
    var buttonData;
    
    a_createjs_obj.gdc_button = {};
    buttonData = a_createjs_obj.gdc_button;
    
    a_createjs_obj.mouseEnabled = true;
    
    buttonData.def_scaleX = a_createjs_obj.scaleX;
    buttonData.def_scaleY = a_createjs_obj.scaleY;
    buttonData.onMouseOver = function (a_buttonObj) {
        var bd;
        bd = a_buttonObj.buttonData;
        bd.def_scaleX = a_buttonObj.scaleX;
        bd.def_scaleY = a_buttonObj.scaleY;
        createjs.Tween.get(a_buttonObj).to({scaleX: bd.def_scaleX * 1.1, scaleY: bd.def_scaleY * 1.1}, 200);
    };
    buttonData.onMouseOut = function (a_buttonObj) {
        var bd;
        bd = a_buttonObj.buttonData;
        createjs.Tween.get(a_buttonObj).to({scaleX: bd.def_scaleX, scaleY: bd.def_scaleY}, 200);
        bd.def_scaleX = 0;
        bd.def_scaleY = 0;
    };
    a_createjs_obj.on(
};