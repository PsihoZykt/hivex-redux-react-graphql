import {gql} from "apollo-server-express";
import {Users} from "../db/dbConnector.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "./resolvers.graphql.js";
import {getFilteredEntity} from "../helpers/FilterParsing.js";

export const userDefs = gql`
    scalar Date
    type User {
        _id: ID,
        name: String,
        proxy: Proxy,
        salary: Int,
        project: Project,
        workDuration: Int,
        level: Level,
        techStack: String,
        timeStamp: Int,
    }

    input UserInput {
        _id: ID,
        name: String,
        proxy: ProxyInput,
        salary: Int,
        project: ProjectInput,
        workDuration: Int,
        level: Level,
        timestamp: Int,
        techStack: String
        #        filter: UserFilter
    }
    input UserFilter {
        _id: ID,
        name: String
        proxy: ProxyFilter,
        salary: Int,
        workDuration: Int,
        level: Level,
        timestamp: Int,
        techStack: String
        project: ProjectFilter
    }
    input UserSetFilter {
        name: String
        proxy: ProxyFilter,
        salary: Int,
        workDuration: Int,
        level: Level,
        timestamp: Int,
        techStack: String
        project: ProjectSetFilter
    }
    input UpdateUsersInput {
        filter: UserFilter!
        set: UserSetFilter
    }
    type Query {


        getUsers(input: UserFilter): [User]

    }


    type Mutation {
        deleteUsers(input: UserFilter): [User]
        updateUsers(input: UpdateUsersInput): [User]
        addUser(input: UserInput): User


    }
`;

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

