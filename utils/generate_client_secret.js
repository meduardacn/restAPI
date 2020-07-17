// Source: https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple
const jwt = require('jsonwebtoken');


// Update these values with your app's information
const team_id = '4NP5AK64M5'
const client_id = 'com.NoFoodWaste.ServiceID'
const key_id = 'GHXD7L9355'
const key_file = './AuthKey_GHXD7L9355'

// Define the JWT's headers and claims
const headers = {
    //  The token must be signed with your key
  'kid': key_id,
};

const claims = {
// The token is issued by your Apple team
  'iss': team_id,
//   The token applies to Apple ID authentication
  'aud': 'https://appleid.apple.com',
//  The token is scoped to your application
  'sub': client_id,
//  The token is valid immediately
  'iat': Time.now.to_i,
//  The token expires in 6 months(maximum allowed)
  'exp': Time.now.to_i + 86400 * 180,
}

//  Read in the key and generate the JWT
// const ecdsa_key = OpenSSL:: PKey:: EC.new IO.read key_file
// const token = JWT.encode claims, ecdsa_key, 'ES256', headers

// # Print the JWT to stdout
// puts token