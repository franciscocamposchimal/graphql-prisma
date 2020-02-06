import { GraphQLServer } from 'graphql-yoga';

import prisma from './prisma';
import { typeDefs } from './data/schema';
import { resolvers } from './resolvers/index';

const server = new GraphQLServer({
    typeDefs,
    resolvers,
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