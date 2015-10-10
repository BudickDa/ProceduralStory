createStory = function (userId) {
    var story = new Story(userId);
    var player = story.createPlayer();
    player.addEffect(new Spielebuch.Effect('Human', [Rules.humanHealth, Rules.humanFistDamage]));
    var user = Meteor.users.findOne(userId);
    player.setName(user.username);
};