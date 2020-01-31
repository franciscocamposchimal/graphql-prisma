const Query = {
	users(parent, args, { prisma }, info) {
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query
					},
					{
						email_contains: args.query
					}
				]
			};
		}
		return prisma.query.users(opArgs, info);
	},
	posts(parent, args, { prisma }, info) {
		return prisma.query.posts(null, info);
	},
	comments(parent, args, { prisma }, info) {
		return [];
	}
};

export { Query as default };
