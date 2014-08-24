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