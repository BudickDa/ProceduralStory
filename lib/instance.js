/**
 * A bunch of functions that generate hand made scenes.
 * @type {{}}
 */
Instance = {};
Instance.library = {};
Instance.getInstance = function(story, player, chance){
    return this.library.house.build(story,player,chance);
}