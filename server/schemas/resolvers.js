const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parents, args, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }

            return await User.findById(context.user._id);
        }
    },

    Mutation: {
        signin: async (parent, args /** the args are first name, last name, email, pass */) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.verifyPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token };
            // tokens are encoded
        }
    }
};

module.exports = resolvers;