'use strict';

var
winston = require('winston'),
nodemailer = require('nodemailer'),
envVar = process.env;

var debugging = (parseInt(envVar.CX_DEBUG) === 1);

module.exports = {
  debugging: debugging,
  domain: envVar.CX_DOMAIN || '<%= props.domain %>',
  database: {
    uri: envVar.CX_MONGO_URI || '<%= props.mongoUri %>',
    options: {
    }
  },
  log: {
    transports: [ // only log to console
      new (winston.transports.Console)({ level: 'debug' })
    ]
  },
  recaptcha: {
    siteKey: envVar.CX_RECAPTCHA_SITEKEY || '-- secret --',
    secretKey: envVar.CX_RECAPTCHA_SECRET || '-- secret --',
    verbose: debugging
  },
  mailer: {
    transport: nodemailer.createTransport({
      transport: 'ses', // loads nodemailer-ses-transport
      accessKeyId: envVar.CX_AWS_ACCESSKEYID || '-- secret --',
      secretAccessKey: envVar.CX_AWS_ACCESSSECRET || '-- secret --'
    }),
    fromSystem: 'Ticonerd <no-reply@ticonerd.com>'
  },
  contact: {
    sendTo:   envVar.CX_CONTACT_ADDR || '<%= props.contactTo %>',
    sendFrom: envVar.CX_CONTACT_FROM || '<%= props.contactFrom %>',
    subject:  envVar.CX_CONTACT_SUBJ || '<%= props.contactSubject %>'
  },
  forgotPw: {
    sendFrom: envVar.CX_FORGOTPW_FROM || envVar.CX_CONTACT_FROM || '<%= props.forgotPwFrom %>',
    subject:  envVar.CX_FORGOTPW_SUBJ || '<%= props.forgotPwSubject %>'
  },
  server: {
    api: {
    },
    backend: {
    },
    authenticator: {
    }
  },
  secret: {

    //
    // Generate a new token secret:
    // node scripts/new-private-key.js
    //

    token: envVar.CX_SECRET_TOKEN || '-- secret --'
  },
  session: {
    durationShortLived: <%= props.sessionDurShort %>,
    durationLongLived: <%= props.sessionDurLong %>
  }
};
