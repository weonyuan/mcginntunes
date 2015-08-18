'use strict';

app.controller('MainCtrl', [
  '$scope',
  '$location',
  '$sce',
  'Spotify',
  function($scope, $location, $sce, Spotify) {
  $scope.header = 'Eminem or Fall Out Boy?';
  
  var previewUrl = '';

  $scope.login = function() {
    Spotify.login().then(function(data) {
      $location.path('/');
      console.log('You are now logged in.');

      Spotify.getPlaylistTracks('weon.yuan', '2XNdp0gQQGYdPTu4tXHfhD').then(function(data) {
        var tracks = data['items'];
        //var randomNumber = Math.floor(Math.random() * tracks.length);
        //var previewUrl = tracks[randomNumber]['track']['preview_url'];
        previewUrl = 'https://p.scdn.co/mp3-preview/95b23bb39d4afd0155a0d70e6feac5b78e69d2f0';
        
        $scope.$apply(function() {
          $scope.audio = $sce.trustAsResourceUrl(previewUrl);
        });
      });
    }, function(error) {
      console.log(error);
      console.log('Did not log in.');
    });
  }
  
}]);