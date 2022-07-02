import {gql} from "apollo-server-express";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "./resolvers.graphql.js";
import {Proxies, Requests} from "../db/dbConnector.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";

export const requestDefs = gql`
    type Request {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date
    }
    input RequestInput {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date,
    }
    input RequestFilter {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date
    }

   
    input RequestSetFilter {
       request: String,
        response: String,
        createdAt: Date,
    }
    input UpdateRequestInput {
        filter: RequestFilter!
        set: RequestSetFilter
    }

    type Query {
        getRequests(input: RequestFilter): [Request]
    }
    type Mutation {
        addRequest(input: RequestInput): Request
        updateRequests(input: UpdateRequestInput): [Request]
        deleteRequests(input: RequestInput): [Request]
    }

`

export const requestResolvers = {
    Query: {


        getRequests: async (root, {input}) => {
            let requests = await Requests.find().lean()
            return getFilteredEntity(requests, input)
        }
    },
    Mutation: {


        addRequest: async (root, {input}) => {

            input.createdAt = new Date();
            return await mongoDBAddEntityResolver(Requests, root, input)
        },
        deleteRequests: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Requests, root, input)
        },
        updateRequests: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Requests, root, input)
        },

    },
};
