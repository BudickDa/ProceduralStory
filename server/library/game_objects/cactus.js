cactus = {
    description: [
        'There stands a [cactus](cactus).',
        'There stands a [cactus](cactus) and there stands one, and there another. You suddenly realise that you hate cacti.',
        'Nothing here except a lot of [cacti](cactus).'
    ],
    effects: [
        new Spielebuch.Effect('prickly', [Rules.humanFistDamage]) //be careful, cacti fight back!
    ],
    events: [
        {name: 'Drink', event: `
            player.addEffect(new Spielebuch.Effect('Drank from cactus',
                [new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, '+5')]
            ));
            Spielebuch.printd('You drink from the cactus and increase you health.');
            self.destroy();
            `, icon: 'fa-beer'},
        {name: 'Attack', event: `
            player.attack(self);
            `, icon: 'fa-bolt'}
    ]

};