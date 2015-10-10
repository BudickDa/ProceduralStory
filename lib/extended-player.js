class ExtendedPlayer extends Spielebuch.Player {
    /**
     *
     * @param userId
     * @param x: Position of scene
     * @param y: position of scene
     * @param load
     */
    constructor(userId, x, y, load) {
        super(userId, load);
        if(x && y && !load) {
            check(x, Number);
            check(y, Number);
            Spielebuch.Players.update(this._id, {
                $set: {
                    x: x,
                    y: y
                }
            });
        }
    }

    goToRandom(){
        if(Meteor.isServer) {
            chance = new Chance(); //this should be truly random, so we don't use our seed.
        }
        this.goTo(
            chance.integer({min: 1, max: config.width}),
            chance.integer({min: 1, max: config.height})
        );

    }

    goTo(x, y) {
        var position = this.getPosition();
        check(x, Number);
        check(y, Number);
        if (x > config.width) {
            x = x % config.width;
        }
        if (y > config.height) {
            y = y % config.height;
        }
        Spielebuch.Players.update(this._id, {
            $set: {
                x: x,
                y: y
            },
            $push: {
                path: positionToId({x:x,y:y})
            }
        });
            Meteor.call('onLeaveScene', positionToId(position));
        if (Meteor.isClient) {
            generate();
        }
    }

    goNorth() {
        var position = this.getPosition();
        this.goTo(position.x, position.y + 1);
    }

    goSouth() {
        var position = this.getPosition();
        this.goTo(position.x, position.y - 1);
    }

    goWest() {
        var position = this.getPosition();
        this.goTo(position.x - 1, position.y);
    }

    goEast() {
        var position = this.getPosition();
        this.goTo(position.x + 1, position.y);
    }

    goBack() {
        var lastPosition = this.getLastPosition();
        this.goTo(lastPosition.x, lastPosition.y);
    }


    hasVisited(x, y) {
        var cursor = Spielebuch.players.find({
            'path': {
                $in: [x + '|' + y]
            }
        }, {path: 1, limit: 1})
        if (cursor.count() === 0) {
            return true;
        }
        return false;
    }


    getPosition() {
        var doc = {};
        if (this._id) {
            doc = Spielebuch.Players.findOne(this._id);
        } else {
            if (Meteor.isClient) {
                userId = Meteor.userId();
            } else {
                userId = this.get('userId');
            }
            doc = Spielebuch.Players.findOne({userId: userId});
        }
        check(doc.x, Number);
        check(doc.y, Number);
        return {
            x: doc.x, y: doc.y
        };
    }

    getLastPosition() {
        var doc = Spielebuch.Players.findOne(this._id);
        check(doc.path, Array);
        var length = doc.path.length;
        if (length >= 2) {
            return idToPosition(doc.path[length - 2]);
        }else{
            //go north...
            var position = this.getPosition();
            position.y++;
            return position;
        }
    }
}

Player = ExtendedPlayer;

/**
 * Overwrite this, because is is used for stored_function. And we want the ExtendedPlayer on the client.
 */
Spielebuch.Player = ExtendedPlayer;