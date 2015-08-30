'use strict';

// need to check authentication state without having to call login everytime [not much priority]
// need to terminate the game after... (stop player; stop timer; disable buttons; play again?)
// time's up; reached end of playlist


app.controller('PlayCtrl', [
  '$scope',
  '$location',
  '$sce',
  '$timeout',
  'Spotify',
  function($scope, $location, $sce, $timeout, Spotify) {
  
  var previewUrl = '';
  var tracks = [];
  $scope.score = 0;
  var totalTime = 0; // seconds
  var tracksRemaining = 0;
  var countdownTime = 3; // seconds
  
  $scope.login = function() {
    Spotify.login()
    .then(function(data) {
      console.log(data);
      $location.path('/play');
      console.log('You are now logged in.');
    })
    .then(function() {
  		  Spotify.getPlaylistTracks('weon.yuan', '2XNdp0gQQGYdPTu4tXHfhD')
        .then(function(data) {
          tracks = data['items'];
          tracksRemaining = tracks.length;
          
  		    console.log('init');
          $scope.readyCountdown();
          return tracks;
  		  });	  
    }, function(error) {
      console.log(error);
      console.log('Did not log in.');
    });
  }
  
  $scope.readyCountdown = function() {
    var numSec = countdownTime + ""; // toString totalTime

    if (countdownTime >= 0) {
      if (countdownTime != 0) { $scope.countdown = numSec; }
      else { $scope.countdown = 'Go!'; }

      $timeout($scope.readyCountdown, 1000);
      countdownTime--;
    } else {
      $timeout($scope.loadMusic(), 350);
      $scope.playTimer();
      $('#countdown').remove();
    }
  }

  $scope.playTimer = function() {
    // cast them as strings to prevent tampering values
    var numMin = Math.floor(totalTime / 60) + "";
    var numSec = totalTime % 60 + "";

    if (numSec < 10) {
      numSec = "0" + numSec;
    }

    if (totalTime >= 0) {
      $scope.timer = numMin + ":" + numSec;
      $timeout($scope.playTimer, 1000);
      totalTime--;
    } else {
      // stop the player
      console.log('time up');
      gameOver();
    }
  };

  var randomNumber = Math.floor(Math.random() * tracks.length);
  
  var gameOver = function() {
    console.log('gameOver()');
    var player = document.getElementById('player');
    player.src = '';

    var scoreMsgHtml = '<p>Your final score is...</p>';
    scoreMsgHtml += '<div id="finalScore">' + $scope.score + '</div>';

    var retryHtml = '<form action="/"> <input type="submit" value="Retry"></form>';
    
    $('#playContent').empty();
    $(scoreMsgHtml).appendTo('#playContent');
    $(retryHtml).appendTo('#playContent');
    // disable buttons
    // when timer ends or all songs played
    // stop music
    // display final score
    // try again?
  }

  $scope.loadMusic = function() {
    console.log('loadMusic()');
  	
    // generate random number
    randomNumber = Math.floor(Math.random() * tracks.length);
    
    // if current track is null, load a new track
    if (tracks[randomNumber] == null) {
      console.log('url is null');
      if (tracksRemaining != 0) {
        $scope.loadMusic();
      } else {
        // game over man
        gameOver();
      }
    } else {
      --tracksRemaining;
      console.log(tracksRemaining);
      previewUrl = tracks[randomNumber]['track']['preview_url'];

  	  console.log(tracks[randomNumber]['track']['artists'][0]['name']);
  	  console.log(tracks[randomNumber]['track']['name']);

      $scope.audio = $sce.trustAsResourceUrl(previewUrl);
  	}
  };
  
  $scope.decide = function(answer) {
    $scope.artist = tracks[randomNumber]['track']['artists'][0]['name'];
    $scope.songTitle = tracks[randomNumber]['track']['name'];
    
    // reward one point if answer is correct
    if (answer.toLowerCase().trim() === $scope.artist.toLowerCase().trim()) {
      $scope.guess = 'Correct!'
      $scope.score++;
    } else { $scope.guess = 'Wrong...'; }

    tracks[randomNumber] = null;
    console.log(tracks);
    // play the next track
    $scope.loadMusic();
  };
}]);