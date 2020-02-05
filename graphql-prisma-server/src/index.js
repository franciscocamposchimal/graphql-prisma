import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutations';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import prisma from './prisma';
import Subscription from './resolvers/Subscription';
import { typeDefs } from './data/schema';

const server = new GraphQLServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment,
    },
    context(request){
        return {
            prisma,
            request
        }
    }
});

server.start( ()=> {
    console.log('Server online...');
});