import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
// db
import db from "./_db.js";
// import types
import { typeDefs } from "./schema.js";
const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        reviews() {
            return db.reviews;
        },
        authors() {
            return db.authors;
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
async function startServerAndGetURL(server) {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    });
    return url;
}
async function main() {
    try {
        const serverURL = await startServerAndGetURL(server);
        console.log('Server started at:', serverURL);
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}
main();
