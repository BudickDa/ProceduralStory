Instance.library.house = {
    probability: 15,
    build: function (story, player) {
        var scene = story.addScene();
        var door = scene.addText(`
            You stand in front of a house. The [door](door) is open. Do you want to go in?
        `);
        var outsideIndex = scene.index;

        var sceneInside = story.addScene();
        var insideIndex = sceneInside.index;

        door.setEvent('Go in', `
            story.next(${insideIndex});
        `, 'fa-long-arrow-right');

            var insideDoor = sceneInside.addText(`
            You are in the house. Light shines through the [open door](door) behind you.
        `);

            insideDoor.setEvent('Go out', `
            story.next(${outsideIndex});
        `, 'fa-long-arrow-right');

        return scene;


    }
};