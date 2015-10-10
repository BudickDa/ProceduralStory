if (Meteor.isClient) {
    /**
     * Made some changes in the init function of spielebuch to use my extended objects instead of the originals.
     * This should be easier than this...
     *
     * we only need the player and the story... we'll track the text and the scene by ourself.
     */

    Spielebuch.init = function (cb) {
        Session.set('spielebuchReady', false);
        if (Meteor.user()) {
            Meteor.subscribe('extendedUserStory', {
                    onReady: function () {
                         Tracker.autorun(function () {
                            var story = new Story();
                            story.load(Meteor.userId());
                            Spielebuch.story.set(story);
                            Spielebuch.player.set(story.getPlayer());
                            Session.set('storyId', story.get('_id'));
                        });
                        return cb();
                    },
                    onError: function (err) {
                        Spielebuch.error(500, 'Something went wrong with the subscription.');
                        return cb(err);
                    }
                }
            );
        }
    };
}