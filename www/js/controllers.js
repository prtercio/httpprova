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

app.controller('PlaylistsCtrl', function($scope, $http, $ionicLoading, $ionicPopup) {
 var ganhador;
 var time1;
 var time2;
 var resultado1;
 var resultado2;
 $scope.verBtn = true;
$scope.placar = "";

 $scope.jogoSelecionado = function(valor){
  console.log("Resutaldo "+valor);
  $scope.verBtn = false;
  ganhador = valor;
  if(ganhador == 'A'){
    if(resultado1 > resultado2){
      console.log("Vc ganhou o jogo. "+$scope.placar);
      $scope.placarFinal = "Vitoria";
    } else if(resultado1 < resultado2){
      console.log("Vc perdeu o jogo. "+$scope.placar);
      $scope.placarFinal = "Derrota";
    } else {
      console.log("Vc empatou o jogo. "+$scope.placar);
      $scope.placarFinal = "Empate";
    }  
  } else if(ganhador == 'B'){
     if(resultado1 < resultado2){
      console.log("Vc ganhou o jogo. "+$scope.placar);
      $scope.placarFinal = "Vitoria"
    } else if(resultado1 > resultado2){
      console.log("Vc perdeu o jogo. "+$scope.placar);
      $scope.placarFinal = "Derrota";
    } else {
      console.log("Vc empatou o jogo. "+$scope.placar);
      $scope.placarFinal = "Empate";
    }  
  } else {
    ganhador = false;
  }

  if(ganhador != false){
     
  }
 }

  var urlLocal = 'js/BD/presenceJonathan.json';

 $scope.recuperarJogo = function(){
  $scope.lista = false;
  $ionicLoading.show().then(function(){
            //console.log("Loading Jogos");
         });
  $scope.placar = "";
  $scope.respuesta = "";
    $http({
       url: 'https://xboxapi.com/v2/2533274906763963/presence',
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan
                  //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87', // BenbaodanJr
                  //'X-Authorization':idXbl,
                  //'Access-Control-Allow-Methods': 'GET',
                  'Content-Type':'application/json'
                }
      }).then(function(resp) { 
               var richPresence;
               $scope.respuesta = resp.data;
              //console.log("Resp2a: "+resp.data.devices[0].titles[1].activity.richPresence); 
              if(resp.data.state === "Online"){
                $ionicLoading.hide();
                if(resp.data.devices[0].titles[0].id === 69094388){
                  richPresence  = resp.data.devices[0].titles[0].activity.richPresence;
                } else if(resp.data.devices[0].titles[1].id === 69094388){
                  richPresence  = resp.data.devices[0].titles[1].activity.richPresence;
                } else if(resp.data.devices[0].titles[2].id === 69094388){
                 richPresence  = resp.data.devices[0].titles[2].activity.richPresence;
                } else {
                  $scope.placar = "Please goto Fifa.";
                  richPresence = false;
                } 

                if(richPresence != false){
                 var fifaMenu = 'FIFA 17 Temporadas (en los menús)';
                   if(fifaMenu === richPresence){
                      $scope.placar = "No se mostrará el resultado";
                      
                   } else {
                     var idFifa = 69094388;
                     $scope.lista = true;
                   
                   //console.log("Resp2: "+resp.data.devices[0].titles[0].activity.richPresence);               
                   
                   var resultado = richPresence;
                   var separador = ","; // un espacio en blanco
                   var limite    = 1;
                   //var resposta = resultado.split(separador);
                   //console.log(resposta[27], resposta[29]) ;
                   
                   var ini = parseInt(resultado.indexOf("-"))-1;
                   var fin = parseInt(resultado.indexOf("-"))+1;
                   var parcial = resultado.substr(ini, fin);
                   var final = parcial.split(separador);

                   var corta = parcial.indexOf(" ");
                   placar = parcial.substr(0,corta);
                   arrayResultado = placar.split("");
                   console.log(parseInt(arrayResultado[0]) + parseInt(arrayResultado[2]));
                   console.log("------");
                   var recortarTime = String(final.slice(0, -1));
                   var sep = "";
                   var array = "";
                   array = recortarTime.split(sep);
                   console.log("--"+ array); 
                   
                     time1 = array[4]+array[5]+array[6];
                     resultado1 = array[0];
                     time2 = array[10]+array[11]+array[12];
                     resultado2 = array[2];
                   if(resultado1 != undefined){
                   $scope.placar = time1+" "+resultado1+" X "+resultado2+" "+time2;
                     $scope.casa = time1+" "+resultado1;
                     $scope.fora = time2+" "+resultado2;
                     console.log("Placar "+$scope.placar);
                    } else {
                       $scope.placar = "Vc está no Menú";
                    }

                     /*
                     
                     */
                  }
                }

             

              } else {
                console.log("Off");
                  $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                   title: 'Error',
                   template: 'Vc está offline!'
                 });

                 alertPopup.then(function(res) {
                   console.log('cerrar');
                 });
              }

        

    }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
             $ionicLoading.hide();
    });

} // function

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
     var urlJ = 'https://xboxapi.com/v2/2533274906763963/presence';
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


  

});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
});
