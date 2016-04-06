angular.module('<%= props.angularModule %>')
.directive( 'notificationMessage', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'directive/notification/message.html',
    scope: {
      options: '='
    }
  };
});
