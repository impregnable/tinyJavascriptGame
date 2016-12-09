angular.module('RandomObjectFactory', [])
    .service('RandomObject', function() {
        var RandomObject = {};
        var arr = ['damage', 'money', 'luck', 'vitality', 'agility'];
        arr.forEach((item) => {
            RandomObject[item] = Math.ceil(Math.random() * 100);
        });
        return RandomObject;
    });