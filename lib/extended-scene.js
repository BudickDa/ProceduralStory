class ExtendedScene extends Spielebuch.Scene {
    constructor(userId, storyId, load) {
        super(userId, storyId, load);
    }
    setDirection() {
        this.addText(`
            <goback>Leave this place.</goback>
        `);
    }
}
Scene = ExtendedScene;