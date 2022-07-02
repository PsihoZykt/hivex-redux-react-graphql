import {gql} from "apollo-server-express";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {userDefs, userResolvers} from "./userSchema.graphql.js";
import {currencyDefs, currencyResolvers} from "./currencySchema.graphql.js";
import {mentorDefs, mentorResolvers} from "./mentorSchema.graphql.js";
import {projectDefs, projectResolvers} from "./projectSchema.graphql.js";
import {proxyDefs, proxyResolvers} from "./proxySchema.graphql.js";
import {requestDefs, requestResolvers} from "./requestSchema.graphql.js";
import {enumsDefs} from "./enums.graphql.js";
import _ from "lodash";
import {resolvers} from "./resolvers.graphql.js";


export default makeExecutableSchema({
    typeDefs: [userDefs, currencyDefs, mentorDefs, projectDefs, proxyDefs, requestDefs, enumsDefs],
    resolvers: _.merge(userResolvers, currencyResolvers, mentorResolvers, projectResolvers, proxyResolvers, requestResolvers ),
});