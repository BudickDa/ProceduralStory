Gameobjects.sheep = {
    description: [
        ['There stands a [sheep](sheep).','The bloody carcass lies on the grass. It will be a feast for the crows.'],
        ['There stands a [sheep](sheep) and there stands one, and there another. You suddenly realise that you hate sheep.','The bloody carcass lies on the grass. Murderer!'],
        ['Nothing here except a lot of [sheep](sheep).','The sheeps run away. Only one was left behind... the one you killed!']
    ],
    effects: [
        new Spielebuch.Effect('Sheep', [Rules.humanHealth, Rules.humanFistDamage]) //be careful, sheepies can totally kick you ass!
    ],
    events: [
        {name: 'Attack', event: `
            player.attack(self);
            `, icon: 'fa-bolt'}
    ]
};