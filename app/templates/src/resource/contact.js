angular.module('<%= props.angularModule %>')
.factory('Contact', function ($apiUrl, $resource) {
  return $resource($apiUrl('contact/:controller'), {
    controller: null,
    id: null
  }, {
    submit: {
      method: 'POST',
      params: {
        controller: 'submit'
      }
    }
  });
});
