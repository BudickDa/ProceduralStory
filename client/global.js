Template.body.events({
    'click .restart-story': function (event) {
        event.preventDefault();
        Session.set('spielebuchReady', false);
        Meteor.call('startStory', initBook);
    }
});