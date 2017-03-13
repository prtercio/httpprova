var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

app.controller('PlaylistsCtrl', function($scope, $http) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  var url = 'https://xbl.io/api/v1/account'; //'http://hechoennl.gob.mx/services/getCategorias2';
  $http({
    url:url,
    method: 'GET',
    headers: {
                'Access-Control-Allow-Origin': '*',                
                'X-Authorization': '5b3e63aa-4a0b-4dd6-a640-50c1070cfbea',
                'Access-Control-Allow-Methods': 'GET',
                'Content-Type':'application/json'
            }
  }).then(function(resp) {
            console.log("Resp: "+resp);
            $scope.respuesta = resp;
           
  }, function(err) {
           console.log(err.data);
           $scope.error = err;
  });
  /*
$http.jsonp({
    //url:'https://xbl.io/api/v1/Benbaodan',
    url: 'http://hechoennl.gob.mx/services/getCategorias2',
    method: 'GET',   
    headers: {
                'Access-Control-Allow-Origin': '*',                
                //'X-Authorization': '5b3e63aa-4a0b-4dd6-a640-50c1070cfbea',
                'Access-Control-Allow-Methods': 'GET',
                'Content-Type':'application/json'
            }

  }).then(function(resp) {
          console.log("1 "+ resp);
            }, function(err) {
              $scope.error =err;
            });

  $scope.prova = "ABC";
  */


});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
});
