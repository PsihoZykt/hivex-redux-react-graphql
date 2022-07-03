import {Users} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

export const userResolvers = {
    Query: {
        getUsers: async (root, {input}) => {
            let users = await Users.find()
                .populate({path: "project", populate: {path: "mentor"}}).lean()
            return getFilteredEntity(users, input)
        }
    },
    Mutation: {
        deleteUsers: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Users, root, input)
        },
        updateUsers: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Users, root, input)
        },
        addUser: async (root, {input}) => {
            return await mongoDBAddEntityResolver(Users, root, input)
        },
    }
}

