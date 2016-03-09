'use strict';

/**
 * @ngdoc overview
 * @name mcginntunesApp
 * @description
 * # mcginntunesApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mcginntunesApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'spotify'
  ])
  .config(function($routeProvider, SpotifyProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    SpotifyProvider.setClientId('cb402085aa2545b99103a560fb4be159');
    SpotifyProvider.setScope('user-read-private playlist-read-private');
    SpotifyProvider.setRedirectUri('http://weonyuan.github.io/mcginntunes/views/callback.html');
  });
