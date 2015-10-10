generateScene = function(storyId,userId){

    /**
     * Load story and player of user
     */
    var story = new Story(userId,true),
        player = story.getPlayer(),
        position = player.getPosition(),
        x = position.x,
        y = position.y;
    var userSeed = seed + x + y;

    var scene;

    if(x===0 && y===0){
        scene =  Instance.library.hell.build(story,player);
        return scene.getText();
    }

    var chance = new Chance(userSeed);

    /**
     * decide instance or dynamic scene
     */
    if(chance.bool({likelihood: config.probabilities.instance})){
        scene = Instance.getInstance(story,player,position);
    }else{
        scene = new DynamicScene(position,userId);
    }

    /**
     * Add text with directions to go...
     */
    scene.setDirection();
    return scene.getText();
};
