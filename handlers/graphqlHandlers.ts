import * as fs from 'fs';
import { GraphQLServerLambda } from 'graphql-yoga';
import { getUser } from './resolver/Query/getUser';

const typeDefs = fs.readFileSync('./schema.gql').toString('utf-8');

const resolvers = {
    Query: {
        getUser
    }
};

const lambda = new GraphQLServerLambda({
    typeDefs,
    resolvers
});

exports.server = (event, context, cb) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return lambda.graphqlHandler({ ...event, httpMethod: event.method }, context, cb);
};
exports.playground = lambda.playgroundHandler;
