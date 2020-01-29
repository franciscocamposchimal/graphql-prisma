import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }
    type Mutation {
        createUser(name: String, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }
    input createUserInput {
        name: String! 
        email: String! 
        age: Int
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        user: User!
        post: Post!
    }
`;

const resolvers = {
    Query: {
        hello(){
            return 'Hi!';
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info){
            /*
            args.name
            args.email
            args.age
            */
           const user = {
               id: "",
               ...args
           };

           if(foundEmail){
               throw new Error("Email exist.");
           }
            return {

            };
        },
        createPost(parent, args, ctx, info){
            //args.author
            if(!userExist){
                throw new Error('User not found');
            }

            const post = {
                id: "",
                ...args
            };
            
            return {

            };
        },
        createComment(parent, args, ctx, info){
            //userExist args.author
            //postExist args.post && args.published
            if(!userExist || !postExist){
                throw new Error('Unable find data.');
            }

            const comment = {
                id: "",
                ...args
            };

            return {

            };
        }
    },
    Post: {
        author(parent, args, ctx, info){
            //parent.author;
            return [];
        },
        comments(parent, args, ctx, info){
            //parent.id;
            return [];
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            //parent.author
            return "";
        },
        post(parent, args, ctx, info){
            //parent.post
            return "";
        }
    },
    User: {
        posts(parent, args, ctx, info){
            //parent.id
            return [];
        },
        comments(parent, args, ctx, info){
            //parent.id
            return [];
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start( ()=> {
    console.log('Server online...');
});