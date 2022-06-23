import express from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./data/resolvers.graphql.js";
import {typeDefs} from "./data/schema.graphql.js";
import {PORT} from "./config/config.js";
import cors from "cors";
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
// console.log(process.env.DB_PASS)
const __dirname = path.dirname(__filename);
/**
 * Create an Apollo server instance.
 */
const server = new ApolloServer({typeDefs, resolvers
    // mocks: true
});

/**
 * Create an express server and apply the Apollo Server middleware
 */
const app = express();
app.use(cors())
await server.start()
server.applyMiddleware({app});
if(process.env.NODE_ENV === "production")  {
    app.use('/', express.static(path.join(__dirname, 'client', 'build' )))
    app.get('*', (req,res) => {
        const index = path.join(__dirname, 'client', 'build', 'index.html');
        console.log(index)
        res.sendFile(index);
    })
}
app.get("/", (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
});

app.listen({port: PORT}, () => {
    console.log(
        `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );

});
