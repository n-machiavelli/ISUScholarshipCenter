// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('isuscholarshipcenter', ['ionic', 'firebase','angular-data.DSCacheFactory'])


.run(function($ionicPlatform,DSCacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  DSCacheFactory("staticCache",{storageMode: "localStorage"});
})

.filter('capitalize', function() {
  return function(input) {
    return input
  };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.user', {
      url: '/user',
      views: {
        'tab-user': {
          templateUrl: 'templates/tab-user.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'SearchController as vm'
          
        }
      }
    })
    .state('tab.trendingvideos', {
      url: '/home/trendingvideos',
      views: {
        'tab-home': {
          templateUrl: 'templates/trendingvideos.html',
          controller: 'TrendingVideosCtrl'
        }
      }
    })
    .state('tab.allvideos', {
      url: '/allvideos',
      views: {
        'tab-allvideos': {
          templateUrl: 'templates/allvideos.html',
          controller: 'TrendingVideosCtrl'
        }
      }
    })
    .state('tab.articles', {
      url: '/home/articles',
      views: {
        'tab-home': {
          templateUrl: 'templates/articles.html',
          controller: 'ArticlesCtrl'
        }
      }
    })
    .state('tab.article', {
      url: '/home/article/:articleID',
      views: {
        'tab-home': {
          templateUrl: 'templates/article.html',
          controller: 'ArticleCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})
.constant('ServiceBaseApi', "http://dev21.iwss.ilstu.edu/api/");
