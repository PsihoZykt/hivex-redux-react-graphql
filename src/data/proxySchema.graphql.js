import {gql} from "apollo-server-express";
import {
    mongoDBAddEntityResolver, mongoDBDeleteEntitiesResolver, mongoDBUpdateEntitiesResolver,

} from "./resolvers.graphql.js";
import {Projects, Proxies} from "../db/dbConnector.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";

export const proxyDefs = gql`
    type Proxy {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: Currency
    }

    input ProxyInput {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyInput
    }
    input ProxyFilter {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyFilter
    }


    input ProxySetFilter {
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyInput
    }
    input UpdateProxyInput {
        filter: ProxyFilter!
        set: ProxySetFilter
    }
        type Query {
        getProxies(input: ProxyFilter): [Proxy]
    }


    type Mutation {
        addProxy(input: ProxyInput): Proxy
        updateProxies(input: UpdateProxyInput): [Proxy]
        deleteProxies(input: ProxyInput): [Proxy]
    }
`
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
