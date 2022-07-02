import {gql} from "apollo-server-express";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver,
} from "./resolvers.graphql.js";
import {Currencies} from "../db/dbConnector.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";

export const currencyDefs = gql`


    input CurrencyInput {
        _id: ID,
        name: String,
        code: String,
    }

    type Currency {
        _id: ID,
        name: String,
        code: String
    }
    input CurrencyFilter {
        _id: ID,
        name: String,
        code: String
    }
    input CurrencySetFilter {
        name: String,
        code: String
    }
   

    input UpdateCurrencyInput {
        filter: CurrencyFilter!
        set: CurrencySetFilter
    }


    type Query {
        getCurrencies(input: CurrencyFilter): [Currency]
    }


    type Mutation {
        addCurrency(input: CurrencyInput): Currency
        updateCurrencies(input: UpdateCurrencyInput): [Currency]
        deleteCurrencies(input: CurrencyFilter): [Currency]
    }
`
export const currencyResolvers = {
    Query: {
        getCurrencies: async (root, {input}) => {
            let currencies = await Currencies.find().lean()
            return getFilteredEntity(currencies, input)
        },

    },
    Mutation: {


        addCurrency: async (root, {input}) => {
            return await mongoDBAddEntityResolver(Currencies, root, input)

        },
        deleteCurrencies: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Currencies, root, input)
        },
        updateCurrencies: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Currencies, root, input)
        },


    }
};
