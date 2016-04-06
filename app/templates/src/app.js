angular.module('<%= props.angularModule %>', [
  '<%= props.angularModule %>.constants',
  '<%= props.angularModule %>.tpl',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngDate',
  'angular-inview',
  'ui.router',
  'ui.bootstrap',
  'vcRecaptcha',
  'vxWamp'
])
.config(function ($urlRouterProvider, $locationProvider, $httpProvider, $uibTooltipProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false); // messes with crossbar.io
  $httpProvider.interceptors.push('AuthInterceptor', 'HttpNormalizer');
  $uibTooltipProvider.options({
    popupDelay: 500
  });
});
