class GameObject extends Spielebuch.GameObject{
    constructor(objectName, objectKey, referenceId, userId, load) {
        super(objectName, objectKey, referenceId, userId, load);
    }
    destroy() {
        var _id = this._id;
        Spielebuch.GameObjects.remove(_id);
    }
}

Spielebuch.GameObject = GameObject;