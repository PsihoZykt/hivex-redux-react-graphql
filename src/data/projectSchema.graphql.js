import {gql} from "apollo-server-express";
import {Mentors, Projects} from "../db/dbConnector.js";
import {
    mongoDBAddEntityResolver, mongoDBDeleteEntitiesResolver, mongoDBUpdateEntitiesResolver,

} from "./resolvers.graphql.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";


export const projectDefs = gql`
    type Project {
        _id: ID,
        name: String,
        status: ProjectStatus,
        mentor: Mentor,
        country: String,
        duration: Int,
        timestamp: Int,
        techStack: String
    }
    input ProjectInput {
        _id: ID,
        name: String,
        status: ProjectStatus,
        mentor: MentorInput,
        country: String,
        duration: Int,
        timestamp: Int,
        techStack: String
    }
    input ProjectFilter {
        _id: ID,
        name: String,
        status: ProjectStatus,
        mentor: MentorFilter,
        country: String,
        duration: Int,
        timestamp: Int,
        techStack: String

    }
    input ProjectSetFilter {
        country: String,
    }
   
    input UpdateProjectInput {
        filter: ProjectFilter!
        set: ProjectSetFilter
    }
    type Query {

        getProjects(input: ProjectFilter): [Project]
    }

    type Mutation {
        addProject(input: ProjectInput): Project
        updateProjects(input: UpdateProjectInput): [Project]
        deleteProjects(input: ProjectInput): [Project]
    }
    `

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
