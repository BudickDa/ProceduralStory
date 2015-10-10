biomeTypes = [
    {
        name: 'Forrest',
        key: 'forrest',
        color: '#717332',
        danger: 3,
        description: `Home of foul and dangerous creatures.`
    },
    {
        name: 'Grassland',
        key: 'grassland',
        color: '#828C35',
        danger: 0,
        description: `Nothing special... there is a sheep, and there is a sheep.`
    },
    {
        name: 'Dark Forrest',
        key: 'dark_forrest',
        color: '#595731',
        danger: 6,
        description: `You are in the darkest heart of a great forrest. Be careful.`
    },
    {
        name: 'Dessert',
        key: 'dessert',
        color: '#D9C355',
        danger: 5,
        description: `Hot and try and a lot of toxic creatures. Who will kill you first, the sun or the scorpions.`
    },
    {name: 'Swamp', key: 'swamp', color: '#402E2C', danger: 9, description: `Home of foul and dangerous creatures.`}
];

getBiomeWithSeed = function (x, y) {
    var c = new Chance(seed + x + y);
    return c.pick(biomeTypes);
};


class BiomeClass {
    constructor(position) {
        this.position = position;
        this.biomeType = getBiomeWithSeed(position.x, position.y);
    }

    getBiome() {
        if (this.position.x === 0 && this.position.y === 0) {
            return Biomes.hell;
        } else {
            return Biomes[this.biomeType.key];
        }
    }

    getDescription() {
        var c = new Chance(createSeed(this.position) + new Date());
        var biome = this.getBiome();
        if (biome) {
            return c.pick(biome.descriptions);
        } else {
            return '';
        }
    }

    getGameObjectKeys() {
        var c = new Chance(createSeed(this.position)), min;
        var objects = Biomes[this.biomeType.key].objects;
        if (objects.length === 0) {
            return [];
        }
        for (var i = 0; i <= c.integer({min: 0, max: 5}); i++) {
            objects = objects.concat(objects);
        }
        var length = objects.length;

        //return c.pick(objects, c.integer({min: 1, max: length}));
        return [c.pick(objects)];
    }


}
Biome = BiomeClass;