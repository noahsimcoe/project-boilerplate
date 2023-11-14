const { GraphQLError } = require('graphql'); // helps build custom error
const jwt = require('jsonwebtoken');

const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED', // this is available to import into other files to throw as an error
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization; // verify if you have the authentication header

    if (token) {
      token = token.split(' ').pop().trim(); // Bearer aosidjsoidjaosijdsoik
      // splitting ^^ on the empty space between 'bearer' and the token string to just get the token 'aosidjsoidjaosi...'
    }

    if (!token) {
      return req; // no token means the request is returned
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // add data to the request
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};