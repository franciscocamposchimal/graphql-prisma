const Mutation = {
    async createUser(parent, args, { prisma }, info){
        const foundEmail = await prisma.exists.User( {email: args.data.email} );
        if(foundEmail){
            throw new Error("Email exist.");
        }
        return prisma.mutation.createUser({ data: args.data }, info);
    },
    async deleteUser(parent, args, { prisma }, info){
        const userExist = await prisma.exists.User( {id: args.id} );
        if(!userExist){
            throw new Error('User not found');
        }
        return prisma.mutation.deleteUser({ 
            where: {
                id: args.id
            }
        }, info);
    },
    createPost(parent, args, ctx, info){
        if(!userExist){
            throw new Error('User not found');
        }

        const post = {
            id: "",
            ...args.data
        };
        
        return {

        };
    },
    deletePost(parent, args, ctx, info){
        //args.id
        return post;
    },
    createComment(parent, args, { pubsub }, info){
        //userExist args.author
        //postExist args.post && args.published
        if(!userExist || !postExist){
            throw new Error('Unable find data.');
        }

        const comment = {
            id: "",
            ...args.data
        };

        pubsub.publish(`comment ${args.data.post}`, { comment });

        return {

        };
    },
    deleteComment(parent, args, ctx, info){
        //args.id
        return comment;
    },
};

export { Mutation as default };