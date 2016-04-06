angular.module('<%= props.angularModule %>')
.service('$apiUrl', function (API) {
  return function () {
    return API + '/' + Array.prototype.slice.call(arguments)
      .join('/')
      .replace(/\/+/g, '\/')
      .replace(/^\//, '');
  };
});
