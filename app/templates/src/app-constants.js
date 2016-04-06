angular.module('<%= props.angularModule %>.constants', [])
.constant('API', '/<%= props.endpointApi %>')
.constant('DOMAIN', document.location.host.split(':').shift())
.constant('DOMAINHOST', document.location.host)
.constant('DOMAINHTTPS', document.location.protocol === 'https:')
.constant('WAMP_URL', (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' + document.location.host + '/<%= props.endpointWebsock %>')
.constant('WAMP_REALM', 'realm1')
.constant('RECAPTCHA_SITEKEY', '@@recaptcha.siteKey')

.constant('DURATION_SHORT', {
  precise:      false,
  week:         'w',
  weeks:        'wks',
  day:          'day',
  days:         'days',
  hour:         'hr',
  hours:        'hrs',
  minute:       'min',
  minutes:      'mins',
  second:       'sec',
  seconds:      'secs',
  millisecond:  'ms',
  milliseconds: 'ms',
});
