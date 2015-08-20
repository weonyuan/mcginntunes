'use strict';

// need to check authentication state without having to call login everytime


app.controller('MainCtrl', [
  '$scope',
  '$location',
  '$sce',
  '$timeout',
  'Spotify',
  function($scope, $location, $sce, $timeout, Spotify) {
  $scope.header = 'Eminem or Fall Out Boy?';
  
  var previewUrl = '';
  var tracks = [];
  $scope.score = 0;
  var totalTime = 60; // seconds
  
  $scope.login = function() {
    Spotify.login()
    .then(function(data) {
      console.log(data);
      $location.path('/');
      console.log('You are now logged in.');
    })
    .then(function() {
  		  Spotify.getPlaylistTracks('weon.yuan', '2XNdp0gQQGYdPTu4tXHfhD')
        .then(function(data) {
          tracks = data['items'];
          
  		    console.log('init');
          $scope.loadMusic();
          return tracks;
  		  })
        .then(function() {
          $scope.countdown();
        });	  
    }, function(error) {
      console.log(error);
      console.log('Did not log in.');
    });
  }
  
  $scope.countdown = function() {
    // cast them as strings to prevent tampering values
    var numMin = Math.floor(totalTime / 60) + "";
    var numSec = totalTime % 60 + "";

    if (numSec < 10) {
      numSec = "0" + numSec;
    }

    if (totalTime >= 0) {
      $scope.timer = numMin + ":" + numSec;
      $timeout($scope.countdown, 1000);
      totalTime--;
    } else {
      // stop the player
      console.log('time up');
    }
  };

  var randomNumber = Math.floor(Math.random() * tracks.length);
  
  $scope.loadMusic = function() {
    console.log('loadMusic()');
  	
    randomNumber = Math.floor(Math.random() * tracks.length);
  	console.log(tracks[randomNumber]['track']['artists'][0]['name']);
  	console.log(tracks[randomNumber]['track']['name']);
  	
  	previewUrl = tracks[randomNumber]['track']['preview_url'];
  	$scope.audio = $sce.trustAsResourceUrl(previewUrl);
  };
  
  $scope.decide = function(answer) {
    $scope.artist = tracks[randomNumber]['track']['artists'][0]['name'];
    $scope.songTitle = tracks[randomNumber]['track']['name'];
    
    // reward one point if answer is correct
    if (answer.toLowerCase().trim() === $scope.artist.toLowerCase().trim()) {
      $scope.guess = 'Correct!'
      $scope.score++;
    } else { $scope.guess = 'Wrong...'; }

    // play the next song
    $scope.loadMusic();
  };
}]);