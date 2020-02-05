import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUser from '../utils/getUser';

const Mutation = {
	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({
			where: {
				email: args.data.email
			}
		});

		if (!user) {
			throw new Error('Unable to login');
		}

        const isMatch = await bcryptjs.compare(args.data.password, user.password);
        
        if (!isMatch) {
			throw new Error('Unable to login');
		}

		return {
			user,
			token: jwt.sign({ userID: user.id }, '3bb95eeade896657c4526e74ff2a2862039d0a0fe8a9e7155b5fe492cbd78387')
		};
	},
	async createUser(parent, args, { prisma }, info) {
		if (args.data.password.length < 3) {
			throw new Error('Password must be longer.');
		}
		const password = await bcryptjs.hash(args.data.password, 10);

		const user = prisma.mutation.createUser({
			data: {
				...args.data,
				password
			}
		});

		return {
			user,
			token: jwt.sign({ userID: user.id }, '3bb95eeade896657c4526e74ff2a2862039d0a0fe8a9e7155b5fe492cbd78387')
		};
	},
	updateUser(parent, args, { prisma }, info) {
		return prisma.mutation.updateUser(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	deleteUser(parent, args, { prisma }, info) {
		return prisma.mutation.deleteUser(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	createPost(parent, args, { prisma }, info) {
		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: args.data.author
						}
					}
				}
			},
			info
		);
	},
	updatePost(parent, args, { prisma }, info) {
		return prisma.mutation.updatePost(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	deletePost(parent, args, { prisma }, info) {
		return prisma.mutation.deletePost(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	createComment(parent, args, { prisma }, info) {
		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: args.data.author
						}
					},
					post: {
						connect: {
							id: args.data.post
						}
					}
				}
			},
			info
		);
	},
	deleteComment(parent, args, { prisma }, info) {
		return prisma.mutation.deleteComment(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	updateComment(parent, args, { prisma }, info) {
		return prisma.mutation.updateComment(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	}
};

export { Mutation as default };
