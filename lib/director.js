Changes = new Mongo.Collection('changes');
if(Meteor.isClient) {
    Meteor.subscribe('changes');
    var removeGameObjectFromDynamicScene = function (id) {
        var text = Text.get();
        _.forEach(text, (textStack, textStackKey) => {
            _.forEach(textStack, (sentence, sentenceKey) => {
                if (typeof sentence === 'string') {
                    if (sentence.indexOf(`[${id}]`) !== -1) {
                        return textStack.splice(sentenceKey, 1);
                    }
                }
            });
            if (textStack.length === 0) {
                text.splice(textStackKey, 1);
            }
        });
        Text.set(text);
    };
}
var cursor = Spielebuch.GameObjects.find({userId: 'procedural'});
if (Meteor.isClient) {
    cursor.observeChanges({
        removed: function (_id) {
            removeGameObjectFromDynamicScene(_id);
        }
    });
}
if(Meteor.isServer){
    cursor.observe({
        added: function(doc){
            Changes.insert({place: doc.referenceId, action: 'created', name: doc.name, objectId: doc._id});
        },
        removed: function (doc) {
            Changes.insert({place: doc.referenceId, action: 'destroyed', name: doc.name});
            Changes.remove({place: doc.referenceId, action: 'created', name: doc.name});
        }
    });
}

