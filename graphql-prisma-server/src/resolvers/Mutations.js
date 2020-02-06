import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUser from '../utils/getUser';
import * as fs from 'fs';
import * as path from 'path';

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

		const privateKey = fs.readFileSync(path.join(__dirname, `../keys/private.key`));
		const token = jwt.sign(
			{ userId: user.id }, 
			{ key: privateKey, passphrase: 'cervus' }, 
			{ algorithm: 'RS256' },
			{ expiresIn: '1h' }
			);

		return {
			user,
			token
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

		const privateKey = fs.readFileSync(path.join(__dirname, `../keys/private.key`));
		const token = jwt.sign(
			{ userId: user.id },
			{ key: privateKey, passphrase: 'cervus' },
			{ algorithm: 'RS256' },
			{ expiresIn: '1h' }
		);

		return {
			user,
			token
		};
	},
	updateUser(parent, args, { prisma, request }, info) {
		const userId = getUser(request);

		return prisma.mutation.updateUser(
			{
				where: {
					id: userId
				},
				data: args.data
			},
			info
		);
	},
	deleteUser(parent, args, { prisma }, info) {
		const userId = getUser(request);

		return prisma.mutation.deleteUser(
			{
				where: {
					id: userId
				}
			},
			info
		);
	},
	createPost(parent, args, { prisma, request }, info) {
		const userId = getUser(request);

		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: userId
						}
					}
				}
			},
			info
		);
	},
	async updatePost(parent, args, { prisma, request }, info) {
		const userId = getUser(request);
		const postExist = await prisma.exist.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!postExist) {
			throw new Error('Unable to update post.');
		}
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
	async deletePost(parent, args, { prisma, request }, info) {
		const userId = getUser(request);
		const postExist = await prisma.exist.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!postExist) {
			throw new Error('Unable to delete post.');
		}

		return prisma.mutation.deletePost(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async createComment(parent, args, { prisma, request }, info) {
		const userId = getUser(request);
		const postExist = await prisma.exist.Post({
			id: args.data.post,
			published: true
		});

		if(!postExist){
			throw new Error('Unable to find post.');
		}
		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: userId
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
	async deleteComment(parent, args, { prisma, request }, info) {
		const userId = getUser(request);
		const commentExist = await prisma.exist.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!commentExist) {
			throw new Error('Unable to delete comment.');
		}

		return prisma.mutation.deleteComment(
			{
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async updateComment(parent, args, { prisma, request }, info) {
		const userId = getUser(request);
		const commentExist = await prisma.exist.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!commentExist) {
			throw new Error('Unable to update comment.');
		}
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
