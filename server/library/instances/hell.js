Instance.library.hell = {
    count: 0,
    build: function (story, player) {
        var gameOver = story.addScene();
        gameOver.addText(`
            <h1>Game over</h1>
            You can start a new game by clicking 'Restart' in the upper right corner.
        `);
        return gameOver;
    }
};