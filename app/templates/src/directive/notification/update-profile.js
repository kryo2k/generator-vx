angular.module('<%= props.angularModule %>')
.directive( 'notificationUpdateProfile', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'directive/notification/update-profile.html',
    scope: {
      options: '='
    }
  };
});
