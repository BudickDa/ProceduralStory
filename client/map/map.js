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
        if (Session.get('resolution') > 10) {
            Session.set('resolution', Session.get('resolution') - 10);
        }
    },
    'click .reset': function(){
        Session.set('resolution', 20);
    }
});

var ctx = -1, c;
Tracker.autorun(function () {
    if (Session.equals('mapOpen', false) || ctx === -1) {
        return;
    }
    var resolution = Session.get('resolution');
    var doc = Spielebuch.Players.findOne({userId: Meteor.userId()});
    if(doc) {
        ctx.save();
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        var offsetX = -doc.x * resolution + c.width*0.5;
        var offsetY = -doc.y * resolution + c.height*0.5;

        _.forEach(doc.path, (item)=> {
            var position = idToPosition(item);
            ctx.fillStyle = getBiomeWithSeed(position.x, position.y).color;
            ctx.fillRect(position.x * resolution + offsetX, position.y * resolution + offsetY, resolution, resolution);
        });
        ctx.fillStyle = '#9D0422';
        ctx.beginPath();
        ctx.arc(doc.x * resolution + 0.5 * resolution + offsetX, doc.y * resolution + 0.5 * resolution + offsetY, 4, 0, 2 * Math.PI);
        ctx.stroke();
    }
});