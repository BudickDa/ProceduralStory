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
        c = document.getElementById("mapCanvas");
        ctx = c.getContext("2d");
        ctx.fillStyle = "#FF0000";
        Session.set('mapOpen', true);
        $('#modal-map').modal();
    }
});

Template.map.events({
    'click .bigger': function () {
        Session.set('resolution', Session.get('resolution') + 10);
    }, 'click .smaller': function () {
        if (Session.get('resolution') >= 10) {
            Session.set('resolution', Session.get('resolution') - 10);
        }
    }
});

var ctx = -1, c;
Tracker.autorun(function () {
    if (Session.equals('mapOpen', false) || ctx === -1) {
        return;
    }
    var resolution = Session.get('resolution');
    var doc = Spielebuch.Players.findOne({userId: Meteor.userId()});
    ctx.clearRect(0,0,c.width, c.height);
    ctx.translate(doc.x*resolution,doc.x*resolution + c.height *0.5);
    _.forEach(doc.path, (item)=> {
        var position = idToPosition(item);
        ctx.fillStyle = getBiomeWithSeed(position.x, position.y).color;
        ctx.fillRect(position.x * resolution, position.y * resolution, resolution, resolution);
    });
    ctx.fillStyle = '#9D0422';
    ctx.beginPath();
    ctx.arc(doc.x * resolution + 0.5 * resolution, doc.y * resolution + 0.5 * resolution, 4, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.translate(0,0);
    //-doc.y - c.height * 0.5 -doc.y - c.height * 0.5
});