# Yeoman VX Generator

VX is an advanced boiler plate including Crossbar, Angular 1.5x, NodeJS and MongoDB. This boilerplate was made into a yeoman generator, to allow building web apps with a significant head-start on the majority of common logic found in modern web applications. The features included in this build are listed below.

## Installation

```bash
# install yeoman
npm install -g yeoman

# install the NPM generator package
npm install -g git+https://kryo2k@github.com/kryo2k/generator-vx.git
```

## Compile your first build

```bash
mkdir project-name
cd project-name
yo vx
```

More to come..

## Noteworthy Features

### Cryptographically secure token auth system

Key algorithm: secp256k1, Cipher algorithm: aes-256-ctr

Backend uses a dual-secret (user+app) signing method when issuing limited life-time API access tokens. These tokens are used to authenticate user on web and wamp activities. This allows for various degrees of validation using pure mathematics before needing to consult a db for validity.

This elliptic curve cryptography (ECC) (private/public key) algorithm allows to securely encrypt data belonging to a user but optionally shared with other keys while never exposing either user's original secret.

### Real-time backend using Crossbar and Autobahn

Crossbar orchestrates a secure real time interprocess messaging system. Components connect to this messaging system using TCP or Web sockets. This allows all system components and web users to be notified in real-time when conditions are correct. Using autobahn, events can easily be pushed to related sessions using PUB/SUB and promise backed RPC.

### Ajax HTTP backend using NodeJS + Express + Mongoose

This back end allows for HTTP based (ajax/rest) communication. It is also a component of WAMP which provides seamless communication between HTTP and Websocket connections. Mongoose is an event-driven ODM (object document mapper) for MongoDB.

### Frontend and Backend model-based input validation

Integrated with bootstrap's validation classes, this allows for angular forms to display validation errors on individual fields. These errors can be defined on the model level or in the controller level. The http backend normalizes all errors, and supports log storage, debugging and analytical features.

### Weak-password prevention using OWASP

Forces users to always use a secure password. This prevents weakness of any system or user account.

### Google ReCAPTCHA Integration

Seamlessly integrated ReCAPTCHA to further increase security and prevent spam/ddos from anonymous users. https://www.google.com/recaptcha/intro/index.html

### Background Mailing System

Using Nodemailer9's node package, and Amazon SES integration. This service also has an asynchronous queuing system which prevents stalling output response to user and reliably sends email in the background. Also allows for sending templated (JADE) emails.

### Heartbeat detection

Not literally. But the application does track user activity to determine if idle. If the user is not idle, and the token expires, the token renews before it expires... if the user is idle, he gets kicked to the login page automatically.

The application also displays various warnings to the user before a token goes bad. There is a configurable countdown that appears in the tab title as well.

### Customizable push-notification system.

Any component, with correct privileges, can push notifications through wamp. These notifications are presented to the user when ever something on their account changes, or when programmatic logic dictates.

The appearance of notifications can be customized using angular directives on a type/class basis. Custom express middleware allows for user notifications to be easily pushed to the connected user.

### Encrypted p2p messaging system.

Allows one user to send an encrypted message to another user. This was built as a test combining real time push notifications with shared secret cryptography.

### Pagination of large datasets using mongoose pagination plugin.

Also has a complimenting frontend component which allows traversing these large datasets with infinite scrolling.

### Ready-to-use Onboarding pages

This includes a login, sign-up and a password recovery system which uses the user's email to recover a lost or forgotten password.

### Contact Page

Fully functional contact page. Currently able to be configured per-environment.

... and LOTS of other express middle-ware, nodejs components, services, angular directives, filters, controllers, services for interacting with key pieces of the system. Mostly sandboxing at this point.
