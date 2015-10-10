Instance.library.feast = {
    count: 20,
    build: function (story, player) {
        var scene = story.addScene();
        var table = scene.addText(`
            You see a [table](table) around it there sits a group of beautiful creatures. High and mighty, wise and powerful, they all have pointy ears. It is the elfking with his followers.
        `);

        var swag = scene.addText(`Gold and silver, vast [riches](treasure) lie around carelessly.`);

        var cutScene = story.addScene();
        var cutSceneIndex = cutScene.index;

        table.setEvent('Try to reach the table', `
            story.next(${cutSceneIndex});
            Spielebuch.startUiCountdown(4000, 1000, function () {
                player.goToRandom();
            });
        `, 'fa-long-arrow-right');
        swag.setEvent('Try to steal from the table', `
            self.set('name', 'Worthless fork');
            self.take();
            story.next(${cutSceneIndex});
            Spielebuch.startUiCountdown(4000, 1000, function () {
                player.goToRandom();
            });
        `, 'fa-usd');

        cutScene.addText(`
            Carefully you close the distance...
        `);
        return scene;
    }
};