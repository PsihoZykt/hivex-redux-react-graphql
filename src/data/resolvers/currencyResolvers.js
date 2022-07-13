import {Currencies} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

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
