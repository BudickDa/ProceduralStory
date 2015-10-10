class ExtendedStory extends Spielebuch.Story {
    constructor(userId, load) {
        super(userId, load);
    }

    createPlayer() {
        if (Meteor.isClient) {
            Spielebuch.error(403, 'You cannot add a user to a story from the client.');
        }
        if (Meteor.isServer) {
            var userId = this.get('userId');
            Spielebuch.log('Creating player for user ' + userId + '.');

            /**
             * create start position
             */
            var chance = new Chance(userId);
            this.x = chance.integer({min: 1, max: config.width});
            this.y = chance.integer({min: 1, max: config.height});

            return new Player(userId, this.x, this.y);
        }
    }

    getPlayer(){
        return new Player(this.get('userId'), this.x, this.y,true);
    }

    /**
     * User the scene object of this application.
     */
    addScene() {
        if (Meteor.isServer) {
            var player = this.getPlayer();
            var scene = new Scene(this.get('userId'), this.get('_id'), player.getPosition());
            this.push('scenes', scene.get('_id'));
            scene.index = this.get('scenes').length - 1;
            return scene;
        }
    }

    next(index){
        super.start(index);
        var sceneId = _.last(this.get('history'));
        var scene = new Scene(this.get('userId'), this._id, true);
        scene.load(sceneId);
        if(Meteor.isClient){
            Text.set(scene.getText());
        }
    }
}
Story = ExtendedStory;

/**
 * Overwrite this, because is is used for stored_function. And we want the ExtendedStory on the client.
 */
Spielebuch.Story = ExtendedStory;