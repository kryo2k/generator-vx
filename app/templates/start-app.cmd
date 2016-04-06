@SETLOCAL
@SET "CX_AWS_ACCESSKEYID=<%= props.awsKey %>"
@SET "CX_AWS_ACCESSSECRET=<%= props.awsSecret %>"
@SET "CX_DOMAIN=<%= props.domain %>"
@SET "CX_CONTACT_ADDR=<%= props.contactTo %>"
@SET "CX_CONTACT_FROM=<%= props.contactFrom %>"
@SET "CX_CONTACT_SUBJ=<%= props.contactSubject %>"
@SET "CX_FORGOTPW_FROM=<%= props.forgotPwFrom %>"
@SET "CX_FORGOTPW_SUBJ=<%= props.forgotPwSubject %>"
@SET "CX_RECAPTCHA_SITEKEY=<%= props.recaptchaKey %>"
@SET "CX_RECAPTCHA_SECRET=<%= props.recaptchaSecret %>"
@SET "CX_DEBUG=<%= options.debugging ? 1 : 0 %>"
@SET "CX_SECRET_TOKEN=<%= privateKey %>"
@SET "CX_MONGO_URI=<%= props.mongoUri %>"

@crossbar start
@ENDLOCAL
@EXIT
