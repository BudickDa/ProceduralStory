var seed = `K8YKP1kO1bHYgoZSRChY
            OtV1OSJZIfu9NeyeJtZR
            4gRTJgZfLdVBNm7nm24m
            WAhyCbhAdtdTcD7FDXT1
            UrkVM8dljxn9dq1WhiwR
            PZy02uwQVUzDgVAYBk2L
            wOTjS2ok27CEGpqtypjp
            PNOf42AGHkSEvfGhAGyO
            n8yNNgYG0fE2adaiGCMh
            WdjHGWpgx9vTVBBjGgCY
            9Oyp5FGqNjR8aWeHo5zS
            3meOW6NcmEC08rA2q15P
            NUpPdr0o8PA10cPvgxSh
            lKJtEuIHWSBr9PSEM0f7
            Vg6AcruQiNYkIeICTujO
            gB93of2k4hc9O7b3Y3rJ
            HypkbwSV9HYat9kRdvpO
            SP7msN6gf9mM7ewDpvOw
            eMB26HmzOwvDlZn7pmlZ
            TTBoQS3Z1FuHUA9R9cUc`;

generateScene = function(storyId,userId){
    /**
     * Load story and player of user
     */
    var story = new Story(userId,true),
        player = new Player(userId,false,false,true),
        position = player.getPosition(),
        x = position.x,
        y = position.y;

    var chance = new Chance(seed + x + y);

    var scene;
    /**
     * decide instance or dynamic scene
     */
    if(chance.bool({likelihood: config.probabilities.instance})){
        console.log('generate instance...');
        scene = Instance.getInstance(story,player,chance);
    }else{
        console.log('generate dynamic scene...');
        scene = new DynamicScene(position,userId,chance);
    }

    console.log(scene);

    /**
     * Add text with directions to go...
     */
    scene.setDirection();
    return scene.getText();
};
