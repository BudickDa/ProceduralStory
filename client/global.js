Template.body.events({
    'click .restart-story': function (event) {
        event.preventDefault();
        Session.set('spielebuchReady', false);
        Meteor.call('startStory', initBook);
    },
    'click .open-map': function (event) {
        event.preventDefault();
        $('#modal-map').modal();
    }
});