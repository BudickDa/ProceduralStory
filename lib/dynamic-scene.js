var buildScene = function(scene){
    var biome = new Biome(scene.position);
    scene.addText(biome.getDescription());

};



class DynamicSceneClass {
    constructor(position,userId){
        this.userId = userId;
        this._id = positionToId(position);
        this.text = [];
        this.position = position;

        buildScene(this);
    }

    addText() {
        if (Meteor.isServer) {
            var re = /\[([^\]]+)\]\(([^)]+)\)/, result = {}, textStack = [], gameObjectArray = [];
            _.forEach(arguments, (text) => {
                var regexResult = re.exec(text);
                if (regexResult !== null) {
                    var objectName = regexResult[1];
                    var objectKey = regexResult[2];
                    var gameObject = new Spielebuch.GameObject(objectName, objectKey, this._id, this.userId,false);
                    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/, '[' + gameObject.get('_id') + ']');
                    gameObjectArray.push({key: objectKey, gameObject: gameObject});
                }
                textStack.push(text);
            });
            this.text.push(textStack);
            Spielebuch.log('Added text to scene ' + this._id + '.');
            if (gameObjectArray.length > 1) {
                _.forEach(gameObjectArray, (item)=> {
                    result[item.key] = item.gameObject;
                });
            } else if (gameObjectArray.length === 1) {
                result = gameObjectArray[0].gameObject;
            }
            return result;
        }
    }



    setDirection() {
        this.addText(`
            <gonorth>Turn north.</gonorth>
            <gowest>Turn west.</gowest>
            <goeast>Go east.</goeast>
            <gosouth>Go south.</gosouth>
        `);
    }

    getText(){
        return this.text;
    }
}

DynamicScene = DynamicSceneClass;