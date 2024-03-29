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
import {authResolvers} from "./data/resolvers/authResolvers.js";
import jwt from "jsonwebtoken";



// Because of es6 syntax had to add it
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
/**
 * Create an Apollo server instance.
 */
// load files and merge them into a single schema object
const schema = await loadSchema(path.join(__dirname, "./data/schemas", "*.gql"), {
    loaders: [new GraphQLFileLoader()]
})
const resolvers = _.merge(userResolvers, currencyResolvers, mentorResolvers, projectResolvers, proxyResolvers, requestResolvers, authResolvers)
// get the user info from a JWT
// TODO: create some config file for jwt config, replace 123 with correct token from this config
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, "123", null, null);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,

});
const server = new ApolloServer({
    schema: schemaWithResolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({req}) => {
        // Get the user token from the headers. ( Split because auth.header is "Bearer token" )
        const token = req.headers.authorization.split(" ")[1] || '';
        // Try to retrieve a user with the token
        let user;
        try {
            user = getUser(token);
        } catch (e) {
            console.log(e)
        }
        // Add the user to the context
        return {user};
    },
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
