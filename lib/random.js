Math.seed = Math.floor(Math.random() * 10000) + 1;
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function () {
   Math.seed = (Math.seed * 9301 + 49297) % 233280; 
    return (Math.seed / 233280);
};

Math.randomBetween = function (min, max) { 
     return min + Math.random() * (max - min);
};

Math.randomIntBetween = function (min, max) { 
     return Math.round(min + Math.random() * (max - min));
};

Math.seededRndBetween = function (min, max) { 
     return min + Math.seededRandom() * (max - min);
};

Math.seededRndIntBetween = function (min, max) { 
     return Math.round(min + Math.seededRandom() * (max - min));
};