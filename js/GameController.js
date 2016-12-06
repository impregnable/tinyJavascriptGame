var myGame = angular.module('GameController', []);

myGame.controller('GameController', function($scope, AntiMage) {
    // can't use 'fat arrow ES6's syntax' to define controller - it's not suitable here, interesting
    // it can be done in jsfiddle though

    // it's the perfect time to start a new collection with some initial attributes
    var am = {
        name	:	'Anti-Mage',
        damage	:	100,
        primaryAttribute	:	'agility',
        agility	:	50,
        strength	:	40,
        luck	:	30,
        money	:	100
    };

    // random artifacts
    $scope.art1	=	{
        id	:	'artifact #1',
        damage	:	45,
        agility	:	25,
        strength : 0,
        luck : 0,
        price	:	35
    };
    $scope.art2 = {
        id	:	'artifact #2',
        damage : 95,
        agility	: 0,
        strength : 0,
        luck : 0,
        price : 55
    };
    // in case
    $scope.arts = [{id	:	'artifact #1', damage	:	45, agility	:	25, price	:	35}, {id	:	'artifact #2', damage	:	95, agility	:	0, price	:	55}];

    // create Hero's instance
    var antimage = AntiMage.createFromObject(am);

    $scope.myFactory = antimage;

    $scope.name = antimage.name;

    // create custom object that will contain all purchases
    var allPurchases = [];
    // amount of purchases
    $scope.amount = 0;

    $scope.buyArtifact = (artifact) => {
        var replicaArtifact, artifactId, checking;
        try {
            antimage.buy(artifact);
            // replicate that artifact (maybe it's not necessary, will see)
            // replicaArtifact = Object.assign({}, artifact);  // superb method (they will NOT match)
            replicaArtifact = artifact;
            artifactId = replicaArtifact['id'];
            // how many artifacts I've already bought?
            $scope.amount += 1;
            if ($scope.amount > 0) {
                $scope.sale = true;
            }
            // at first I passed just id and it's amount to that object, but then I found out in the development process that I can't work in my factory's method with only this data, I also need the rest of art's characteristics. I tried to filter over all arts in search for appropriate one (I mean, find object by id), but I came across a new issue - I can't use $scope and $filter in my factory (in fact, it's just a class). Then I tried to return callback with success (from factory to controller) and in controller use context (this), but...
            // 'I can't get THIS attributes here (seems that THIS is really 'this' only in my class, right here it's nothing)' So...
            // at last I decided to just pass all attributes here, when I create my custom object. It solved the problem. (no) New issue - how to determine which attribute belongs to which art... It must be several objects! And yeah, really AT LAST I completed the task :D I mean I created automatically array of objects that contains ALL. Hope that's it :D

            // when you work with just object it's gonna look like this:
            // if (!(artifactId in allPurchases)) {
            //  allPurchases[artifactId] = 1;
            // } else {
            //  allPurchases[artifactId] += 1;
            // }

            // but I'm working with array of objects, so...
            checking = allPurchases.filter((el) => el.id === artifactId);

            if(!checking.length) {
                allPurchases.push({
                    id : artifactId,
                    amount : 1,
                    damage : replicaArtifact['damage'],
                    agility : replicaArtifact['agility'],
                    strength : replicaArtifact['strength'],
                    luck : replicaArtifact['luck'],
                    price : replicaArtifact['price']
                });
            } else {
                checking[0].amount += 1;
            }
            // YEEEEEAH MAN YOU FINALLY MADE IT

            console.log(allPurchases, 'allPurchases');
            $scope.allPurchases = allPurchases;
            $scope.money	=	false;
            $scope.emptyBag = false;
        } catch (error) {
            console.log('Out of money');
            $scope.money = true;
        }
    };

    $scope.sellArtifact = (allPurchases, onePurchase) => {
        try {
            antimage.sell(allPurchases, onePurchase);
            $scope.amount -= 1;
            $scope.money = false;
            $scope.emptyBag = false;
            // that was my attempt to find right art (now it's not necessary)
            // var searchForArtifactWithThatName = $filter('filter')($scope.arts, {id: artifactName}, true);
        } catch (error) {
            console.log(error);
            $scope.emptyBag = true;
            console.log("You've already sold all artefacts of that type.");
        }
    };

    $scope.$watchGroup(['myFactory.getDamage()', 'myFactory.getAgility()', 'myFactory.getStrength()', 'myFactory.getLuck()', 'myFactory.getMoney()'], (newValue) => {
        $scope.currentDamage = newValue[0];
        $scope.currentAgility = newValue[1];
        $scope.currentStrength = newValue[2];
        $scope.currentLuck = newValue[3];
        $scope.currentMoney = newValue[4];
    })
});