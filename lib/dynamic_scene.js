class DynamicSceneClass {
    constructor(position, userId) {
        this.userId = userId;
        this._id = positionToId(position);
        this.text = [];
        this.position = position;
        this.buildScene(this);
    }

    buildScene() {
        var biome = new Biome(this.position);
        this.addText(biome.getDescription());
        var gameObjectKeys = biome.getGameObjectKeys();
        _.forEach(gameObjectKeys, (key)=> {
            var gameObjectForm = Gameobjects[key];
            var c = new Chance(positionToId(this.position));
            var text = c.pick(gameObjectForm.description);
            var change = Changes.findOne({place: positionToId(biome.position), name: key});
            if (change && change.action === 'destroyed') {
                this.addText(text[1]);
            }else if(change && change.action === 'created') {
                this.addObject(text, change.objectId);
            }
            else{
                var gameObject = this.addText.apply(this, text);
                gameObject.set('userId', 'procedural');
                gameObject.addEffect(c.pick(gameObjectForm.effects));
                _.forEach(gameObjectForm.events, (event)=> {
                    gameObject.setEvent(
                        event.name,
                        event.event,
                        event.icon
                    );
                });
            }
        });
    }

    addObject(arguments, id){
        var re = /\[([^\]]+)\]\(([^)]+)\)/, result = {}, textStack = [], gameObjectArray = [];
        _.forEach(arguments, (text) => {
            var regexResult = re.exec(text);
            if (regexResult !== null) {
                var objectName = regexResult[1];
                var objectKey = regexResult[2];
                text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/, '[' + id + ']');
            }
            textStack.push(text);
        });
        this.text.push(textStack);
    }

    addText() {
        var re = /\[([^\]]+)\]\(([^)]+)\)/, result = {}, textStack = [], gameObjectArray = [];
        _.forEach(arguments, (text) => {
            var regexResult = re.exec(text);
            if (regexResult !== null) {
                var objectName = regexResult[1];
                var objectKey = regexResult[2];
                var gameObject = new Spielebuch.GameObject(objectName, objectKey, this._id, this.userId, false);
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


    setDirection() {
        this.addText(`
            <gonorth>Turn north.</gonorth>
            <gowest>Turn west.</gowest>
            <goeast>Go east.</goeast>
            <gosouth>Go south.</gosouth>
        `);
    }


    getText() {
        return this.text;
    }
}

if (Meteor.isServer) {
    DynamicScene = DynamicSceneClass;
}