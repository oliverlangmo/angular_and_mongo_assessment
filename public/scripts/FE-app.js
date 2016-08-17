console.log('script sourced');

var myApp = angular.module('myApp',['ngRoute']);


//routing for views
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

//sends hero to DB
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

//Gets hero from DB
myApp.controller('superGetter', ['$scope', '$http', '$location',function($scope,$http, $location){
 $scope.batSignal = function(){
     $http({
       method: 'GET',
       url:'/callHero',
     }).then(function(response){
       $scope.allTheHeroes = response.data;
       console.log(response.data);
     });
   };
$scope.deleteHero = function(){
  var heroToDelete = {
    id: event.target.id
  };
  console.log(heroToDelete);
  $http({
  method:'DELETE',
  url:'/deleteHero',
  data: heroToDelete,
  headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then( function mySuccess( response ) {
              console.log( response.data ) ;
          }, function myError( response ) {
              console.log( response.statusText ) ;
});
location.reload();
};


}]);
