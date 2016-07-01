console.log('script sourced');

var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  when('/home',{
    templateUrl:"/views/routes/home.html",
  }).when('/register',{
    templateUrl:"/views/routes/register.html",
    controller: "superPoster"
  }).when('/seeHeroes',{
     templateUrl:'/views/routes/seeHeroes.html',
     controller: "superGetter"
  }).otherwise({
    redirectTo:'home'
  });
}]);

myApp.controller('superPoster', ['$scope', '$http', function($scope,$http){

 $scope.superSender = function(){
  var heroToRegister = {
   alias:$scope.aliasIn,
   fname:$scope.fnameIn,
   surname:$scope.lnameIn,
   city:$scope.cityIn,
   power:$scope.power_name
 };
 console.log(heroToRegister);
$http({
  method:'POST',
  url: '/postHero',
  data: heroToRegister
});
 };
}]);
myApp.controller('superGetter', ['$scope', '$http',function($scope,$http){
 $scope.batSignal = function(){
     $http({
       method: 'GET',
       url:'/callHero',
     }).then(function(response){
       $scope.allTheHeroes = response.data;
  //      console.log(response.data);
  //      var objectToDisplay={
  //        alias: response.data.alias,
  //        name: response.data.name,
  //        surname: response.data.surname,
  //        city: response.data.city,
  //        power: response.data.power
  //      };
  //     console.log(objectToDisplay);
     });
   };
$scope.deleteHero = function(){
  $http({
    method: 'GET',
    url:'/callHero',
  }).then(function(response){
  var heroToDelete = {
    alias: response.data.alias
  };
  console.log(heroToDelete);
  $http({
  method:'DELETE',
  url:'/deleteHero',
  data: heroToDelete
}).then($scope.batSignal());
});
};


}]);
