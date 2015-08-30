'use strict';

app.controller('MainCtrl', [
	'$scope',
	'$location',
	'Spotify',
	function($scope, $location, Spotify) {
    $scope.about = 'Inspired by the McGinnDog, prepare for a game that ' +
                   'will have you thinking and engaged with fine tunes ' +
                   'handpicked by the legend himself. Do you have what ' +
                   'it takes to be a true McGinnDog?';
}]);