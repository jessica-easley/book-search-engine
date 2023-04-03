const { User } = require('./models');

const resolvers = {
    Query: {
        user: async (parent, {username, _id }) => {
            return User.findOne({
                Sor: [{ _id }, { username }],
            }).populate('savedBooks');
        },
        users: async () => {
            return User.find().populate('savedBooks');
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            return user;
        },

    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('Incorrect Credentials');
        }

        const rightPw = await user.isRightPassword(password);
        if (!rightPw) {
            throw new AuthenticationError('Incorrect Credentials');
        }

        const token = signToken(user);
        return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: input } },
                { new: true }
            ).populate('savedBooks');
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    },
};

module.exports = resolvers;