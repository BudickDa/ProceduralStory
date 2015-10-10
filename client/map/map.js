Session.setDefault('resolution', 20);
Session.set('mapOpen', false);
/*
 Template.map.helpers({
 mapData: function () {
 var doc = Spielebuch.Players.findOne({userId: Meteor.userId()});
 if(doc) {
 return _.map(doc.path, (item)=> {
 return idToPosition(item);
 });
 }
 }
 });*/

Template.body.events({
    'click .open-map': function (event) {
        event.preventDefault();
        var c = document.getElementById("mapCanvas");
        ctx = c.getContext("2d");
        ctx.fillStyle = "#FF0000";
        Session.set('mapOpen', true);
        $('#modal-map').modal();
    }
});

var ctx = -1;
Tracker.autorun(function () {
    if (Session.equals('mapOpen', false) || ctx === -1) {
        return;
    }
    var doc = Spielebuch.Players.findOne({userId: Meteor.userId()});
    if (doc) {
        _.forEach(doc.path, (item)=> {
            var position = idToPosition(item);
            ctx.fillStyle = getBiomeWithSeed(position.x, position.y).color;
            ctx.fillRect(position.x * Session.get('resolution'), position.y * Session.get('resolution'), Session.get('resolution'), Session.get('resolution'));
        });
    }
    ctx.fillStyle = '#9D0422';
    ctx.beginPath();
    ctx.arc(doc.x * Session.get('resolution') + 0.5 * Session.get('resolution'), doc.y * Session.get('resolution') + 0.5 * Session.get('resolution'), 4, 0, 2 * Math.PI);
    ctx.stroke();
});