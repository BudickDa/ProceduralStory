Meteor.methods({
    startStory: function () {
        if (this.userId === null) {
            throw new Meteor.Error('403', 'User is not logged in.');
        } else {
            Meteor.call('deleteStoryOfUser');
            createStory(this.userId);
        }
    },
    generate: function(storyId){
        if (this.userId === null) {
            throw new Meteor.Error('403', 'User is not logged in.');
        } else {
            return generateScene(storyId, this.userId);
        }
    },
    onLeaveScene: function(sceneId){
        /**
         * If the user leaves a scene, we have to delete all the objects in this scene.
         */
        if (this.userId === null) {
            throw new Meteor.Error('403', 'User is not logged in.');
        } else {
            Spielebuch.GameObjects.remove({
                referenceId: sceneId,
                userId: this.userId
            })
        }
    }
});