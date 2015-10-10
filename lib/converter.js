idToPosition = function (id) {
    check(id, String);
    var array = id.split('|');
    if (array.length === 2) {
        return {
            x: parseInt(array[0]),
            y: parseInt(array[1])
        };
    }
};

positionToId = function(position){
    check(position, {x:Number,y:Number});
    return `${position.x}|${position.y}`;
};