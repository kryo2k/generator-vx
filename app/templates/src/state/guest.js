angular.module('<%= props.angularModule %>')
.config(function ($stateProvider) {
  $stateProvider
    .state('app.guest', {
      abstract: true,
      templateUrl: 'state/guest.html',
      controller: 'AppGuestCtrl'
    });
})
.controller('AppGuestCtrl', function ($scope) {
});
