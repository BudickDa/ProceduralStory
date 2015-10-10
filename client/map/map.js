Session.setDefault('resolution',20);

Template.map.helpers({
    mapData: function(){
        return Spielebuch.Players.find({userId: Meteor.userId}, {path: 1}).map((doc)=>{
            doc.coordinates = idToPosition(doc.path);
            return doc;
        })
    }
});