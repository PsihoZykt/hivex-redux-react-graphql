import {environment} from "../config/config.js";
import {friendSchema} from "./schema/friendSchema.js";
import {seriesSchema} from "./schema/seriesSchema.js";
import mongoose from "mongoose";
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
 **/

mongoose.connect(environment[env].dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Friends = mongoose.model('Friends', friendSchema);
const Series = mongoose.model('Series', seriesSchema);

export {Friends, Series};