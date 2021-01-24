import User from "@root/db/models/user";

const resolvers = {
  author: async (parent: any, _args: any, _context: any) => {
    const { author: authorId } = parent;

    const user = await User.findById(authorId);
    if (!user) throw new Error("Author not found!");

    return user;
  },
};

export default resolvers;
