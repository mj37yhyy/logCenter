(function() {
  'use strict';

  angular
    .module('fe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // .state('home', {
      //   url: '/',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainController',
      //   controllerAs: 'main'
      // })
        .state('query', {
            url: '/query',
            templateUrl: 'app/components/query/query.html',
            controller: 'QueryController'
        })
        .state('trajectory', {
            url: '/trajectory/:traceId',
            templateUrl: 'app/components/trajectory/trajectory.html',
            controller: 'TrajectoryController',
            controllerAs: 'vm'
        });

    $urlRouterProvider.otherwise('/query');
  }

})();
