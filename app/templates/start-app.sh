#!/bin/sh

export CX_AWS_ACCESSKEYID="<%= props.awsKey %>"
export CX_AWS_ACCESSSECRET="<%= props.awsSecret %>"
export CX_DOMAIN="<%= props.domain %>"
export CX_CONTACT_ADDR="<%= props.contactTo %>"
export CX_CONTACT_FROM="<%= props.contactFrom %>"
export CX_CONTACT_SUBJ="<%= props.contactSubject %>"
export CX_FORGOTPW_FROM="<%= props.forgotPwFrom %>"
export CX_FORGOTPW_SUBJ="<%= props.forgotPwSubject %>"
export CX_RECAPTCHA_SITEKEY="<%= props.recaptchaKey %>"
export CX_RECAPTCHA_SECRET="<%= props.recaptchaSecret %>"
export CX_DEBUG="<%= options.debugging ? 1 : 0 %>"
export CX_SECRET_TOKEN="<%= privateKey %>"
export CX_MONGO_URI="<%= props.mongoUri %>"

crossbar start
