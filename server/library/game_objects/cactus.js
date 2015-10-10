Gameobjects.cactus = {
    description: [
        ['There stands a [cactus](cactus).','You now know the count of all the cacti in the dessert. It is one less than before.'],
        ['There stands a [cactus](cactus) and there stands one, and there another. You suddenly realise that you hate cacti.','Your hatred was strong and the cactus is gone.'],
        ['Nothing here except a lot of [cacti](cactus).','You wonder if there is a cacti heaven...']
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