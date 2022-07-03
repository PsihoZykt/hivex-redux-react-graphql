import express from "express";
import cors from "cors";
import path from 'path'
import {ApolloServer} from "apollo-server-express";
import {PORT} from "./config/config.js";
import {fileURLToPath} from "url";
import {loadSchema} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import _ from "lodash";
import {addResolversToSchema} from "@graphql-tools/schema";
import {userResolvers} from "./data/resolvers/userResolvers.js";
import {currencyResolvers} from "./data/resolvers/currencyResolvers.js";
import {mentorResolvers} from "./data/resolvers/mentorResolvers.js";
import {projectResolvers} from "./data/resolvers/projectResolvers.js";
import {proxyResolvers} from "./data/resolvers/proxyResolvers.js";
import {requestResolvers} from "./data/resolvers/requestResolvers.js";


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
/**
 * Create an Apollo server instance.
 */
const schema = await loadSchema(path.join(__dirname, "./data/schemas", "*.gql"), {
    // load files and merge them into a single schema object
    loaders: [new GraphQLFileLoader()]
})
const resolvers = _.merge(userResolvers, currencyResolvers, mentorResolvers, projectResolvers, proxyResolvers, requestResolvers )
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});
const server = new ApolloServer({
    schema: schemaWithResolvers
    // csrfPrevention: true,
    // cache: 'bounded',
});

/**
 * Create an express server and apply the Apollo Server middleware
 */

const app = express();
app.use(cors())
await server.start()
server.applyMiddleware({app});
if (process.env['NODE_ENV'] === "production") {
    app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')))
    app.get('*', (_req, res) => {
        const index = path.join( __dirname, '..', 'client', 'build', 'index.html');
        res.sendFile(index);
    })
}

app.listen({port: PORT}, () => {
    console.log(
        `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );

});
