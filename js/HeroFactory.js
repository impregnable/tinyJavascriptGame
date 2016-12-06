angular.module('GameFactories', [])
    .factory('Hero', () => {

        // constructor to all heroes
        function Hero(name, damage, primaryAttribute, agility, strength, luck, money) {
            this.name	=	name;
            this.damage	=	damage;
            this.primaryAttribute	=	primaryAttribute;
            this.agility	= agility;
            this.strength	=	strength;
            this.luck	=	luck;
            this.money = money;
        }

        // public methods in Hero
        Hero.prototype	=	{
            buy	:	function(artifact) {
                if	(this.money >= artifact.price) {
                    this.damage += artifact.damage;
                    this.agility += artifact.agility;
                    this.strength += artifact.strength;
                    this.luck += artifact.luck;
                    this.money -= artifact.price;
                } else {
                    throw new Error;
                }
            },
            getDamage : function() {
                return this.damage;
            },
            getAgility : function() {
                return this.agility;
            },
            getStrength : function() {
                return this.strength;
            },
            getLuck : function() {
                return this.luck;
            },
            getMoney : function() {
                return this.money;
            },
            sell : function(allPurchases, onePurchase) {
                console.log(allPurchases, 'allPurchases');
                console.log(onePurchase, 'onePurchase');
                // maybe here I have to implement some logic to check if there was a purchase
                if (onePurchase.amount > 0) {
                    onePurchase.amount -= 1;
                    this.damage -= onePurchase.damage;
                    this.agility -= onePurchase.agility;
                    this.strength -= onePurchase.strength;
                    this.luck -= onePurchase.luck;
                    this.money += onePurchase.price;
                } else {
                    throw new Error;
                }
            }
        };

        // static method
        Hero.createFromObject = (obj) => {
            return new Hero(obj.name, obj.damage, obj.primaryAttribute, obj.agility, obj.strength, obj.luck, obj.money);
        };

        return Hero;
    })
    // it's gonna be a bit complicated, right
    // the one and only thing you can(must) do with a code like this is admire it :)
    .factory('AntiMage', (Hero) => {
        // plain inheritance (without polymorphism)
        var AntiMage = Object.create(Hero);
        return AntiMage;
    });
