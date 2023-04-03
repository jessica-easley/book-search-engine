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
        
    }
}