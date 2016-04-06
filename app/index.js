var
os = require('os'),
crypto = require('crypto'),
yeoman = require('yeoman-generator'),
chalk = require('chalk'),
yosay = require('yosay');

const
keySerializeAs = 'hex',
keyAlgorithm   = 'secp256k1';

function newPrivateKey() {
  var
  ecdh = crypto.createECDH(keyAlgorithm);
  ecdh.generateKeys();
  return ecdh.getPrivateKey(keySerializeAs)
}

var
VXGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    var
    DEFAULT_FROM = this.appname + ' <no-reply@'+this.appname+'>',
    DEFAULT_NS = this.appname;

    this.option('private', {
      desc: 'Make this project private',
      type: Boolean,
      defaults: true
    });

    this.option('debugging', {
      desc: 'Configure with debugging enabled',
      type: Boolean,
      defaults: true
    });

    this.option('set-version', {
      desc: 'Version to use for this project',
      type: String,
      defaults: '0.0.1'
    });

    this.option('author', {
      desc: 'Author Name',
      type: String,
      defaults: 'Hans Doller <hans@ticonerd.com>'
    });

    this.option('domain', {
      desc: 'Domain Base URL',
      type: String,
      defaults: 'http://localhost'
    });

    this.option('port-frontend', {
      desc: 'Frontend Port',
      type: Number,
      defaults: 8080
    });

    this.option('port-backend-express', {
      desc: 'Backend (Express) Port',
      type: Number,
      defaults: 8081
    });

    this.option('port-backend-wamp', {
      desc: 'Backend (Wamp) Port',
      type: Number,
      defaults: 9000
    });

    this.option('endpoint-api', {
      desc: 'Endpoint API URL',
      type: String,
      defaults: 'api'
    });

    this.option('endpoint-websock', {
      desc: 'Endpoint Websock URL',
      type: String,
      defaults: 'ws'
    });

    this.option('angular-module', {
      desc: 'Base angular module name',
      type: String,
      defaults: DEFAULT_NS
    });

    this.option('wamp-namespace', {
      desc: 'Base wamp namespace name',
      type: String,
      defaults: this.options['angular-module'] || DEFAULT_NS
    });

    this.option('session-duration-short', {
      desc: 'Session Duration for Short-term sessions (MS)',
      type: Number,
      defaults: 3600000 // 1 hr
    });

    this.option('session-duration-long', {
      desc: 'Session Duration for Long-term sessions (MS)',
      type: Number,
      defaults: 7 * 86400000 // 7-days
    });

    this.option('mongo-uri', {
      desc: 'URI to use for accessing mongodb',
      type: String,
      defaults: 'mongodb://localhost:27017/' + this.appname
    });

    this.option('aws-key', {
      desc: 'Amazon SES Access Key',
      type: String,
      defaults: 'AMZINVALIDKEY'
    });

    this.option('aws-secret', {
      desc: 'Amazon SES Access Secret',
      type: String,
      defaults: 'AMZ/Invalid/Secret'
    });

    this.option('recaptcha-key', {
      desc: 'Google ReCAPTCHA Key',
      type: String,
      defaults: 'INVALIDKEY'
    });

    this.option('recaptcha-secret', {
      desc: 'Google ReCAPTCHA Secret',
      type: String,
      defaults: 'InvalidSecret'
    });

    this.option('license', {
      desc: 'License Type',
      type: String,
      defaults: 'GPL-3.0'
    });

    this.option('contact-email-to', {
      desc: 'Email for contact (to)',
      type: String,
      defaults: DEFAULT_FROM
    });

    this.option('contact-email-from', {
      desc: 'Email for contact (from)',
      type: String,
      defaults: this.options['contact-email-from'] || DEFAULT_FROM
    });

    this.option('contact-subject', {
      desc: 'Subject for contact',
      type: String,
      defaults: 'Contact from site (Name: {name} Email: {email})'
    });

    this.option('forgot-pw-email-from', {
      desc: 'From email for forgot password',
      type: String,
      defaults: this.options['contact-email-from']
    });

    this.option('forgot-pw-subject', {
      desc: 'Subject for forgot password',
      type: String,
      defaults: 'Forgot password request'
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
    this.isLinuxLike = (os.platform() !== 'win32');
    this.isWindows   = (os.platform() === 'win32');
    this.privateKey  = newPrivateKey();
    this.mainLauncher = this.isWindows ? 'start-app.cmd' : 'start-app.sh';
  },

  prompting: function() {

    var
    done = this.async(),
    prompt = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'sessionDurShort',
        message: 'Session Duration for Short-term sessions (MS)',
        default: this.options['session-duration-short']
      },
      {
        type: 'input',
        name: 'sessionDurLong',
        message: 'Session Duration for Long-term sessions (MS)',
        default: this.options['session-duration-long']
      },
      {
        type:' input',
        name: 'endpointApi',
        message: 'Endpoint to use for API',
        default: this.options['endpoint-api']
      },
      {
        type:' input',
        name: 'endpointWebsock',
        message: 'Endpoint to use for Websockets',
        default: this.options['endpoint-websock']
      },
      {
        type: 'input',
        name: 'portFrontend',
        message: 'Frontend Port',
        default: this.options['port-frontend']
      },
      {
        type: 'input',
        name: 'portBackendExpress',
        message: 'Frontend Port',
        default: this.options['port-backend-express']
      },
      {
        type: 'input',
        name: 'portBackendWamp',
        message: 'Frontend Port',
        default: this.options['port-backend-wamp']
      },
      {
        type:' input',
        name: 'angularModule',
        message: 'Angular module to use for base.',
        default: this.options['angular-module']
      },
      {
        type:' input',
        name: 'wampNamespace',
        message: 'Base wamp namespace name.',
        default: this.options['wamp-namespace']
      },
      {
        type: 'input',
        name: 'mongoUri',
        message: 'URI to use for accessing mongodb',
        default: this.options['mongo-uri']
      },
      {
        type: 'input',
        name: 'domain',
        message: 'Domain Base URL',
        default: this.options['domain']
      },
      {
        type: 'input',
        name: 'awsKey',
        message: 'Amazon SES Access Key',
        default: this.options['aws-key']
      },
      {
        type: 'input',
        name: 'awsSecret',
        message: 'Amazon SES Access Secret',
        default: this.options['aws-secret']
      },
      {
        type: 'input',
        name: 'recaptchaKey',
        message: 'Google ReCAPTCHA Key',
        default: this.options['recaptcha-key']
      },
      {
        type: 'input',
        name: 'recaptchaSecret',
        message: 'Google ReCAPTCHA Secret',
        default: this.options['recaptcha-secret']
      },
      {
        type: 'input',
        name: 'contactTo',
        message: 'Email for contact (to)',
        default: this.options['contact-email-to']
      },
      {
        type: 'input',
        name: 'contactFrom',
        message: 'Email for contact (from)',
        default: this.options['contact-email-from']
      },
      {
        type: 'input',
        name: 'contactSubject',
        message: 'Subject for contact',
        default: this.options['contact-subject']
      },
      {
        type: 'input',
        name: 'forgotPwFrom',
        message: 'From email for forgot password',
        default: this.options['forgot-pw-email-from']
      },
      {
        type: 'input',
        name: 'forgotPwSubject',
        message: 'Subject for forgot password',
        default: this.options['forgot-pw-subject']
      }
    ];

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\'Allo \'allo! Out of the box I include VX Boilerplate!'));
    }

    this.prompt(prompt, function(answers) {
      this.props = answers
      this.props.private   = this.options['private'];
      this.props.version   = this.options['set-version'];

      console.log('props:', this.props);

      done();
    }.bind(this));
  },

  app: function () {

    // directories
    this.template('.crossbar');
    this.template('src');
    this.template('server');
    this.template('scripts');
    this.template('email');
    this.template('config');
    this.template('common');

    // special files:
    this.template('bowerrc',      '.bowerrc');
    this.template('editorconfig', '.editorconfig');
    this.template('gitattributes','.gitattributes');
    this.template('gitignore',    '.gitignore');
    this.template('bower.json');
    this.template('gulpfile.js');
    this.template('package.json');
    this.template('README.md');
    this.template('server.js');

    // template over the main launcher
    this.template(this.mainLauncher);

    var // prevent these from leaking into git
    hideSecret = '-- secret --';

    this.privateKey            = hideSecret;
    this.props.awsKey          = hideSecret;
    this.props.awsSecret       = hideSecret;
    this.props.recaptchaKey    = hideSecret;
    this.props.recaptchaSecret = hideSecret;

    // these can be checked in to git as defaults
    this.template('start-app.cmd', 'start-app.cmd.suggested');
    this.template('start-app.sh',  'start-app.sh.suggested');
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: true,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  },
});

module.exports = VXGenerator;
