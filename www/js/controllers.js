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

/*
  var xuid;

  var url = 'https://xbl.io/api/v1/account'; //'http://hechoennl.gob.mx/services/getCategorias2';
  var url2 = 'https://jsonplaceholder.typicode.com/posts/1';
  var url3 = 'https://xboxapi.com/v2/accountxuid';
  var url4 = 'https://xboxapi.com/v2/xuid/BruceGrannec'
  $http({
    url: url4,
    method: 'GET',
    headers: {
                'Access-Control-Allow-Origin': '*',                
                //'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7' //Benbaodan
                'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87'
                //'Access-Control-Allow-Methods': 'GET',
                //'Content-Type':'application/json'
            }
  }).then(function(resp) {
            console.log("Resp: "+resp.data.xuid);
            //$scope.respuesta = resp;
            xuid = resp.data.xuid;

            verDatos(xuid);
           
  }, function(err) {
           console.log(err.data);
           //$scope.error = err;
  });
  */
  
 // uid Diego: 2535463553180810;
 // uid Bruce; 2533274954006095
 //uid Benbaodan: 2533274906763963
// function verDatos (xuid){
  var xuid = 2533274906763963;
  var url3 = 'https://xboxapi.com/v2/messages';
  var url5 = 'https://xboxapi.com/v2/'+xuid+'/friends';
  var url8 = 'https://xboxapi.com/v2/'+xuid+'/gamercard'
  var url6 = 'https://xboxapi.com/v2/'+xuid+'/presence';
  var url9 = 'https://xboxapi.com/v2/'+xuid+'/game-clips';
  var url7 ='https://xbl.io/api/v1/account';
  var idXbl = '946767cd-422c-472e-b001-4f4a4fdace4c';



  $scope.buscrXuid = function (gamertag){
    var url = 'https://xboxapi.com/v2/xuid/'+gamertag;
    $http({
      url: url,
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan               
                  'Content-Type':'application/json'
              }
    }).then(function(resp) { 
              //console.log("Resp2: "+resp.data.devices[0].titles[1].activity.richPresence);
              console.log("Resp2: "+resp.data.xuid);
              $scope.respuesta = resp.data;
               //verDatos(xuid);
             
    }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
    });



  }

  $scope.irHttp = function(){
    var xuid = 2533275028767498;
     var urlJ = 'https://xboxapi.com/v2/'+xuid+'/presence';
    $http({
      url: urlJ,
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan
                  //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87' // BenbaodanJr
                  //'X-Authorization':idXbl,
                  //'Access-Control-Allow-Methods': 'GET',
                  'Content-Type':'application/json'
              }
    }).then(function(resp) {
              //console.log("Resp2: "+resp.data.devices[0].titles[1].activity.richPresence);             
              $scope.respuesta = resp.data;


              //verDatos(xuid);
             
    }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
    });
 }

 var urlLocal = 'js/BD/presenceJonathan.json';

 $http.get(urlLocal).then(function(resp) {
              console.log("Resp2: "+resp.data); 
              console.log("Resp2: "+resp.data.devices[0].titles[0].activity.richPresence);               
              $scope.respuesta = resp.data;
              var resultado = resp.data.devices[0].titles[0].activity.richPresence;
              var separador = ""; // un espacio en blanco
              var limite    = 1;
              var resposta = resultado.split(separador);
              console.log(resposta[27], resposta[29])       


  }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
  });


  

});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
});
