Meteor.publish('extendedUserStory', function () {
    var userOrGlobal = {
        $or: [{userId: this.userId}, {userId: 'global'}, {userId: 'procedural'}]
    };
    return [
        Meteor.users.find({_id: this.userId},
            {fields: {storyId: 1}}),
        Spielebuch.Stories.find(userOrGlobal, {
            fields: {scenes: 1, history: 1, userId: 1}
        }),
        Spielebuch.Scenes.find(userOrGlobal, {
            fields: {effects: 1, onFirstVisit: 1, storyId: 1, text: 1, userId: 1, onVisit: 1, visited: 1}
        }),
        Spielebuch.GameObjects.find(userOrGlobal, {
            fields: {
                effects: 1,
                events: 1,
                name: 1,
                overrides: 1,
                userId: 1,
                referenceId: 1,
                afterDestruction: 1,
                equipmentTarget: 1,
                equipmentRules: 1
            }
        }),
        Spielebuch.StoredFunctions.find(userOrGlobal, {
            fields: {fncString: 1, userId: 1}
        }),
        Spielebuch.Players.find(userOrGlobal, {
            fields: {afterDestruction: 1, userId: 1, effects: 1, name: 1, backpack: 1, body: 1, x: 1, y: 1, path: 1}
        })
    ];
});

Meteor.publish('changes', function () {
    return Changes.find();
});

Spielebuch.GameObjects.allow({
    remove: function (userId, doc) {
        return doc.userId === userId || doc.userId === 'procedural';
    }
});