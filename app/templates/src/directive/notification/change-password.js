angular.module('<%= props.angularModule %>')
.directive( 'notificationChangePassword', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'directive/notification/change-password.html',
    scope: {
      options: '='
    }
  };
});
