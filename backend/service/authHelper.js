var clientId = '';//'1ad84aa0-7a60-454c-94ef-9f68fa8abef9';
var clientSecret = ''; //'VGy7Q~467jeu-KB2y9k4JMQHZdYrMgoNzh1XY';
var redirectUri = 'http://localhost:5500/authorize';
var identityMetadata = 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration'
// 'VGy7Q~467jeu-KB2y9k4JMQHZdYrMgoNzh1XY'
var responseType = 'code id_token';
var responseMode = 'form_post';
var scopes = [
  'openid',
  'profile',
  'user.read',
  'offline_access',
  'https://outlook.office.com/calendars.readwrite'
];

var credentials = {
  clientID: clientId,
  clientSecret: clientSecret,
  site: 'https://login.microsoftonline.com/common',
  authorizationPath: '/oauth2/v2.0/authorize',
  tokenPath: '/oauth2/v2.0/token'
}
var {AuthorizationCode} = require('simple-oauth2')
var oauth2 = new AuthorizationCode({
  client: {
    id: credentials.clientId,
    secret: credentials.clientSecret
  },
  auth: {
    tokenHost: credentials.site,
    authorizePath: credentials.authorizationPath,
    tokenPath: credentials.tokenPath
  }
})
module.exports = {
  clientId,
  clientSecret,
  redirectUri,
  identityMetadata,
  scopes,
  credentials,
  oauth2,
  responseType,
  responseMode,
  getAuthUrl: function() {
    var returnVal = oauth2.authCode.authorizeURL({
      redirect_uri: redirectUri,
      scope: scopes.join(' ')
    });
    console.log('');
    console.log('Generated auth url: ' + returnVal);
    return returnVal;
  },

  getTokenFromCode: function(auth_code, callback, request, response) {
    oauth2.authCode.getToken({
      code: auth_code,
      redirect_uri: redirectUri,
      scope: scopes.join(' ')
      }, function (error, result) {
        if (error) {
          console.log('Access token error: ', error.message);
          callback(request ,response, error, null);
        }
        else {
          var token = oauth2.accessToken.create(result);
          console.log('');
          console.log('Token created: ', token.token);
          callback(request, response, null, token);
        }
      });
  },

  getEmailFromIdToken: function(id_token) {
    // JWT is in three parts, separated by a '.'
    var token_parts = id_token.split('.');

    // Token content is in the second part, in urlsafe base64
    var encoded_token = new Buffer(token_parts[1].replace('-', '+').replace('_', '/'), 'base64');

    var decoded_token = encoded_token.toString();

    var jwt = JSON.parse(decoded_token);

    // Email is in the preferred_username field
    return jwt.preferred_username
  },

  getTokenFromRefreshToken: function(refresh_token, callback, request, response) {
    var token = oauth2.accessToken.create({ refresh_token: refresh_token, expires_in: 0});
    token.refresh(function(error, result) {
      if (error) {
        console.log('Refresh token error: ', error.message);
        callback(request, response, error, null);
      }
      else {
        console.log('New token: ', result.token);
        callback(request, response, null, result);
      }
    });
  }
};