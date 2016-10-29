(function () {
"use strict";

angular.module('public')
.controller('SingUpController', SingUpController);

SingUpController.$inject = ['$state', 'MenuService', 'SignUpService'];
function SingUpController($state, MenuService, SignUpService) {
  var $ctrl = this;
  $ctrl.user = {};
  $ctrl.singUp = singUp;

  function singUp() {
    MenuService.getMenuItem($ctrl.user.dish).then(
      function(resp){
        SignUpService.setUserInfo($ctrl.user.firstName, $ctrl.user.lastName, $ctrl.user.email, $ctrl.user.phone, $ctrl.user.dish);
        $ctrl.showSingUpMessage = true;
        $ctrl.showDishErrorMessage = false;
      },
      function(err){
        $ctrl.showSingUpMessage = false;
        $ctrl.showDishErrorMessage = true;
      }
    );
    
  }

}


})();
