import {gql} from "apollo-server-express";
import {Currencies, Mentors} from "../db/dbConnector.js";
import {
    mongoDBAddEntityResolver, mongoDBDeleteEntitiesResolver, mongoDBUpdateEntitiesResolver,

} from "./resolvers.graphql.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";

export const mentorDefs = gql`
    type Mentor {
        _id: ID,
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }

    input MentorInput {
        _id: ID,
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }
    
    input MentorFilter {
        _id: ID,
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }
    input MentorSetFilter {
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }

    input UpdateMentorInput {
        filter: MentorFilter!
        set: MentorSetFilter
    }
    
    type Query {
        getMentors(input: MentorFilter): [Mentor]
    }


    type Mutation {
        addMentor(input: MentorInput): Mentor
        updateMentors(input: UpdateMentorInput): [Mentor]
        deleteMentors(input: MentorInput): [Mentor]
    }

`

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
