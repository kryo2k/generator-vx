angular.module('<%= props.angularModule %>')
.directive('pageHeader', function () {
  return {
    replace: true,
    transclude: true,
    templateUrl: 'directive/page-header.html',
    scope: {
      title: '=phTitle',
      description: '=phDescription'
    }
  };
});
