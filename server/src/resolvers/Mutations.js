const Mutation = {
    createUser(parent, args, ctx, info){
        /*
        args.name
        args.email
        args.age
        */
       const user = {
           id: "",
           ...args.data
       };

       if(foundEmail){
           throw new Error("Email exist.");
       }
        return {

        };
    },
    deleteUser(parent, args, ctx, info){
        //args.id
        return user;
    },
    createPost(parent, args, ctx, info){
        //args.author
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