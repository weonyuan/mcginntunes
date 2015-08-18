'use strict';

/**
 * @ngdoc overview
 * @name mcgindogApp
 * @description
 * # mcgindogApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mcginndogApp', [
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
      .otherwise({
        redirectTo: '/'
      });
    SpotifyProvider.setClientId('cb402085aa2545b99103a560fb4be159');
    SpotifyProvider.setScope('user-read-private playlist-read-private');
    SpotifyProvider.setRedirectUri('http://localhost:8888/views/callback.html');
  });
