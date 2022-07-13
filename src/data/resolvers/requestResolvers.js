import {Requests} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

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
