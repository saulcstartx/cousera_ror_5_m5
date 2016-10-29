(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);

SignUpService.$inject = [];
function SignUpService()
{
  var userInfo  = {};
  var singUp    = false;
  var service   = this;

  // Public methods
  service.getUserInfo = getUserInfo;
  service.setUserInfo = setUserInfo;
  service.isSingUp    = isSingUp;
  service.singOut     = singOut;

  // ### Method declarations ### //

  function getUserInfo() {
    return userInfo;
  }

  function setUserInfo(firstName, lastName, email, phone, menuOption) {
    userInfo = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phone': phone,
      'menuOption': menuOption
    };
    singUp = true;
  }

  function isSingUp() {
    return singUp;
  }

  function singOut() {
    userInfo = {};
    singUp = false;
  }

}

})();
