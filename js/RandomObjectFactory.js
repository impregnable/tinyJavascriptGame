angular.module('RandomObjectFactory', [])
    .service('RandomObject', function() {
        var RandomObject = {};
        const names = ['Inconceivable Warrior', 'Invulnerable assassin', 'Another Awesome Guy'];
        const attributes = ['damage', 'money', 'luck', 'vitality', 'agility', 'name'];
        const totalNames = names.length;
        attributes.forEach((item) => {
            const random = Math.floor(Math.random() * totalNames);
            if (item === 'name') {
                RandomObject[item] = names[random];
            } else {
                RandomObject[item] = random * 100 + 50;
            }
        });
        return RandomObject;
    });