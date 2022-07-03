import {Mentors} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";


export const mentorResolvers = {
    Query: {


        getMentors: async (root, {input}) => {
            let mentors = await Mentors.find().lean()
            return getFilteredEntity(mentors, input)
        },

    },
    Mutation: {

        addMentor: async (root, {input}) => {
            return await mongoDBAddEntityResolver(Mentors, root, input)
        },
        deleteMentors: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Mentors, root, input)
        },
        updateMentors: async (root, {input}) => {
            return await mongoDBUpdateEntitiesResolver(Mentors, root, input)
        },

    },
};
