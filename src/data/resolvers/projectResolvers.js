import {Projects} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

export const projectResolvers = {
    Query: {

        getProjects: async (root, {input}) => {
            let projects = await Projects.find().populate({path: "mentor"}).lean()
            return getFilteredEntity(projects, input)
        },

    },
    Mutation: {

        addProject: async (root, {input}) => {
            return await mongoDBAddEntityResolver(Projects, root, input)
        },
        deleteProjects: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Projects, root, input)
        },
        updateProjects: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Projects, root, input)
        },

    },
};
