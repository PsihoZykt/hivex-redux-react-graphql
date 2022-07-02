import express from "express";
import cors from "cors";
import path from 'path'
import {ApolloServer} from "apollo-server-express";
import schema from "./data/schema.graphql.js";
import {resolvers} from "./data/resolvers.graphql.js";
import {PORT} from "./config/config.js";
import {fileURLToPath} from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Create an Apollo server instance.
 */

const server = new ApolloServer({
    schema
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
