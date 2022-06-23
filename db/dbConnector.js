import {environment} from "../config/config.js";
import {
    currencySchema,
    mentorSchema,
    projectSchema,
    proxySchema,
    userSchema
} from "./schema/schemas.js";
import mongoose from "mongoose";
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
 **/
console.log(env)
mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});


const Users = mongoose.model('Users', userSchema)
const Projects = mongoose.model('Projects', projectSchema)
const Mentors = mongoose.model('Mentors', mentorSchema)
const Proxies = mongoose.model("Proxies", proxySchema)
const Currencies = mongoose.model("Currency", currencySchema)

export  { Users, Projects, Mentors, Proxies, Currencies};