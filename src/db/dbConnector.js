import {currencySchema, mentorSchema, projectSchema, proxySchema, requestSchema, userSchema} from "./schema/schemas.js";
import mongoose from "mongoose";
import {environment} from "../config/config.js";

const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
 **/
mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
    console.error("Error while connecting to DB");
});


const Users = mongoose.model('Users', userSchema)
const Projects = mongoose.model('Projects', projectSchema)
const Mentors = mongoose.model('Mentors', mentorSchema)
const Proxies = mongoose.model("Proxies", proxySchema)
const Currencies = mongoose.model("Currency", currencySchema)
const Requests = mongoose.model("Request", requestSchema)

export {Users, Projects, Mentors, Proxies, Currencies, Requests};