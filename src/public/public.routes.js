(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })

    .state('public.singup', {
      url: '/singup',
      templateUrl: 'src/public/sing-up/sing-up.html',
      controller: 'SingUpController',
      controllerAs: 'singUpCtrl',
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'MyInfoController',
      controllerAs: 'myInfoCtrl',
      resolve: {
        user: ['MenuService','SignUpService', function (MenuService, SignUpService) {
          var userReg = SignUpService.getUserInfo();
          return MenuService.getMenuItem(userReg.menuOption).then(
            function(resp){
              userReg.menuItem  = resp.data;
              userReg.valid     = true;
              console.log('Ok: ', userReg);
              return userReg;
            },
            function(err){
              userReg.valid     = false;
              console.log('Bad: ', userReg);
              return userReg;
            }
          );
        }]
      }
    });
}
})();
