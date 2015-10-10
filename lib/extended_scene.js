class ExtendedScene extends Spielebuch.Scene {
    constructor(userId, storyId, position, load) {
        super(userId, storyId, load);
        var biome = new Biome(position);
        this.addText(biome.getDescription());
    }

    setDirection() {
        this.addText(`
            <goback>Leave this place.</goback>
        `);
    }
}
Scene = ExtendedScene;