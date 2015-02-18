angular.module('starter.controllers', [])


.controller('AccountCtrl',["$scope","$ionicPopup","User", function($scope,$ionicPopup, User) {
  $scope.user=User.getUser(); //retrieve the user object for $scope.user to use in ng-show
  $scope.login=function(){
    User.login($scope.user.email, $scope.user.password, function(res){
      if (res.id){
        $scope.user=res;
      }else{
        $ionicPopup.alert({   //ionicPopup is ionic's version of JS alert()
          title: 'Login error!',
          template: res.message
        });
      }
    });
  };
  $scope.register=function(){
    User.register($scope.user.email, $scope.user.password, function(res){
      if (res.id){
        $scope.user=res;
      }else{
        $ionicPopup.alert({
          title: "Register Error!",
          template: res.message
        });
      }
    });
  };
  $scope.logout=function(){
    User.logout();
    $scope.user={};
  };
}]);


