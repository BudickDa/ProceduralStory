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
    if(x%2===1&&y%2===1){
        var suroundingBiomes = [],
            suroundingBiomesObj = {};

        suroundingBiomes.push(getBiomeWithSeed(x+1,y).key);
        suroundingBiomes.push(getBiomeWithSeed(x+1,y+1).key);
        suroundingBiomes.push(getBiomeWithSeed(x+1,y-1).key);
        suroundingBiomes.push(getBiomeWithSeed(x-1,y).key);
        suroundingBiomes.push(getBiomeWithSeed(x-1,y-1).key);
        suroundingBiomes.push(getBiomeWithSeed(x-1,y+1).key);
        suroundingBiomes.push(getBiomeWithSeed(x,y+1).key);
        suroundingBiomes.push(getBiomeWithSeed(x,y-1).key);
        _.forEach(suroundingBiomes,(biomeKey)=>{
           if(!suroundingBiomesObj[biomeKey]){
               suroundingBiomesObj[biomeKey] = 1;
           } else{
               suroundingBiomesObj[biomeKey]++;
           }
        });
        return _.invert(suroundingBiomesObj)[_.max(suroundingBiomesObj)];
    }else {
        if(Meteor.isServer) {
            var c = new Chance(seed + x + y);
            return c.pick(biomeTypes);
        }
        if(Meteor.isClient){
            return chance.pick(biomeTypes);
        }
    }
};


class BiomeClass {
    constructor(position) {
        this.position = position;
        this.biomeType = getBiomeWithSeed(position.x, position.y);
    }

    getBiome(){
        return Biomes[this.biomeType.key];
    }

    getDescription(){
        var c = new Chance(createSeed(this.position));
        var biome = this.getBiome();
        if(biome) {
            return c.pick(Biomes[this.biomeType.key].descriptions);
        }else{
            console.log(this.biomeType);
        }
    }

    getGameObjects(){
        var c = new Chance(seed + x + y);
        var objects = Biomes[this.biomeType.key];
        return c.pick(Biomes[objects, c.integer({min: 0, max: objects.length-1})]);
    }


}
Biome = BiomeClass;