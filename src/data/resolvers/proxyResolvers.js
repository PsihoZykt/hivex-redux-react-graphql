import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {Proxies} from "../../db/dbConnector.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

export const proxyResolvers = {
    Query: {


        getProxies: async (root, {input}) => {
            console.log(input)
            let proxies = await Proxies.find().populate({path: "currency"}).lean()
            return getFilteredEntity(proxies, input)

        },

    },
    Mutation: {


        addProxy: async (root, {input}) => {
            return await mongoDBAddEntityResolver(Proxies, root, input)
        },
        deleteProxies: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Proxies, root, input)
        },
        updateProxies: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Proxies, root, input)
        },



    },
};
