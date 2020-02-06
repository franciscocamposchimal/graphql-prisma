import Query from './Query';
import Mutation from './Mutations';
import User from './User';
import Post from './Post';
import Comment from './Comment';
import Subscription from './Subscription';

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
};

export { resolvers };