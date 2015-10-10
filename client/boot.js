Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

/**
 * Spielebuch and Reader must be initialized.
 */
initBook = function () {
    Spielebuch.init(function (err) {
        if (!err) {
            Reader.init();
            generate();
        }
    });
};


generate = function (storyId) {
    var story = Spielebuch.story.get();
    if (story) {
        storyId = story.get('_id');

        Meteor.call('generate', storyId, function (err, text) {
            if (err) {
                console.error(500, err);
            }
            Text.set(text);
            console.log(Spielebuch.player.get().getPosition());
        });
    }
}

/**
 * On every user login, the user doc is checked if it has a story. If not, a new one is creaated
 *
 * After that initBook is executed
 */
Accounts.onLogin(function () {
    if (Meteor.user().storyId === '') {
        Meteor.call('startStory', initBook);
    } else {
        initBook();
    }
});

/**
 * On load without login, initBook hat to be executed too.
 */
Meteor.startup(function () {
    if (Meteor.user()) {
        initBook();
    }
});