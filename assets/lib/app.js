var myNinjaApp = angular.module('myNinjaApp', []);
myNinjaApp.controller('NinjaController', ['$scope', function($scope){
    $scope.removeBelt = function(belt){
        var removedBelt = $scope.messages.indexof(belt);
        $scope.messages.splice(removedBelt, 1);
        };
        $scope.addNinja = function(){
            $scope.messages.push({
            messages: $scope.newmessages.messaged,
            belt: $scope.newmessages.belt,
            rate:parseInt ($scope.newmessages.rate),
            available: true
            });
    };

    $scope.messages = [
        {
            messaged: "Hello am a software enginneer",
            belt: "blue",
            rate: 40,
            available: true
        },
        {
            messaged: "My name is kunbyy",
            belt: "black",
            rate: 90,
            available: true
        },
        {
            messaged: "I'm a female",
            belt: "pink",
            rate: 60,
            available: true
        }
    ];

}]);
