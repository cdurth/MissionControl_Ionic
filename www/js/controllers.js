angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localstorage) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });
  
  // Form data for the login modal
  $scope.launchPads = $localstorage.get('launchPads');
  if(typeof($scope.launchPads) === 'undefined' || $scope.launchPads === ''){
    $scope.launchPads = [];
  } else {
    $scope.launchPads = JSON.parse($scope.launchPads);
  }
  $scope.launchpadData = {};
  
  $scope.updateLocalStorage = function(){
    $localstorage.set('launchPads', JSON.stringify($scope.launchPads));
  };
  
  // *******************************
  // ********* MODAL STUFF *********
  // *******************************
  // Create the add launchpad modal
  $ionicModal.fromTemplateUrl('templates/addLaunchpad.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // close modals
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the launchpad modal
  $scope.launchpad = function() {
    $scope.modal.show();
  };

  // add launchpad
  $scope.addLaunchpad = function() {
    $scope.launchPads.push({"id":$scope.launchpadData.id,"delay":$scope.launchpadData.delay,"enabled":$scope.launchpadData.enabled});
    $scope.updateLocalStorage();
    $scope.launchpadData.id = "";
    $scope.launchpadData.delay = "";
    $scope.launchpadData.enabled = "";
    $scope.closeModal();
  };
})

.controller('HomeCtrl', function($scope,$state,$stateParams,refreshService,$window) {
  $scope.$on('$ionicView.loaded', function(e) {
    $scope.flag = refreshService.getProperty();
    if($scope.flag){
      console.log('inside');
      $scope.flag = refreshService.setProperty(false);
      $window.location.reload(true);
    }
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams,refreshService) {
   $state.go('app.home', {cache: false}) 
})

.controller('addLaunchpadCtrl', function($scope, $stateParams,refreshService) {
})

.controller('SettingsCtrl', function ($scope, $state, $stateParams, $localstorage, refreshService) {
  $scope.settingsData = $localstorage.getObject('launchpadSettings');
  if(typeof($scope.settingsData) === 'undefined'){
    console.log('new');
   $scope.settingsData = {};
  }
  
  $scope.saveSettings = function() {
    console.log($scope.settingsData);
    $localstorage.setObject('launchpadSettings', $scope.settingsData);
  };
  
  $scope.clearLaunchpads = function() {
    $localstorage.set('launchPads', '');
    $scope.launchPads = [];
    $scope.flag = refreshService.setProperty(true);
    console.log(refreshService.getProperty());
  };
});