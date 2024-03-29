angular.module('<%= props.angularModule %>')
.service('$debounce', function ($timeout) {

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  return function (func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      if(timeout) $timeout.cancel(timeout);
      timeout = $timeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
});
