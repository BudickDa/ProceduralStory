sheep = {
    description: [
        'There stands a [sheep](sheep).',
        'There stands a [sheep](sheep) and there stands one, and there another. You suddenly realise that you hate sheep.',
        'Nothing here except a lot of [sheep](sheep).'
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