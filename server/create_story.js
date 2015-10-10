Rules = {
    humanHealth: new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, 80),
    humanFistDamage: new Spielebuch.Rule(Spielebuch.Gameplay.damage, 20)
};

createStory = function (userId) {
    var story = new Story(userId);
    var player = story.createPlayer();
    player.addEffect(new Spielebuch.Effect('Human', [Rules.humanHealth, Rules.humanFistDamage]));
    var user = Meteor.users.findOne(userId);
    player.setName(user.username);
};