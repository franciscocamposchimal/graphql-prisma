import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466/default/prod',
	secret: '5989796f6ab867450accd81fff145bed'
});

export { prisma as default };
