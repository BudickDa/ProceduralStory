/**
 * A bunch of functions that generate hand made scenes.
 * @type {{}}
 */
Instance = {};
Instance.library = {};
Instance.getInstance = function (story, player, position, seed) {
    /**
     * Check what instances are allowed here
     */
    var biomeType = getBiomeWithSeed(position.x, position.y);
    var allowedInstances = Biomes[biomeType.key].instances;

    if (allowedInstances.length === 0) {
        //no instance allowed
        return new DynamicScene(position, userId);
    } else {
        var pot = [];
        _.forEach(this.library, (instance, key)=> {
            if (instance.count && _.contains(allowedInstances, key)) {
                for (var i = 0; i < instance.count; i++) {
                    pot.push(key);
                }
            }
        });
        var c = new Chance(seed);
        var winner = c.pick(pot);
        return Instance.library[winner].build(story, player, seed);
    }
};


/**
 * A bunch of biomes
 */
Biomes = {};

/**
 * A bunch of gameobjects
 */
Gameobjects = {};

