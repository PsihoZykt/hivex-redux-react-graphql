import {gql} from "apollo-server-express";


export const typeDefs = gql`
    scalar Date
    #     Enums
    enum ProjectStatus {
        open
        active
        closed
    }

    enum Role {
        mentor
        worker
    }
    enum Level {
        junior
        middle
        senior
    }

    #     Types 
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
    type Request {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date
    }
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
    type Proxy {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: Currency
    }
    type Currency {
        _id: ID,
        name: String,
        code: String
    }
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

    #Inputs


    input RequestInput {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date,
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

    input ProxyInput {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyInput
    }

    input CurrencyInput {
        _id: ID,
        name: String,
        code: String,
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


    #Filters
    input RequestFilter {
        _id: ID,
        request: String,
        response: String,
        createdAt: Date
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
    input ProxyFilter {
        _id: ID,
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyFilter
    }
    input CurrencyFilter {
        _id: ID,
        name: String,
        code: String
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
#        proxy: ProxyFilter,
        salary: Int,
        workDuration: Int,
        level: Level,
        timestamp: Int,
        techStack: String
        project: ProjectSetFilter
    }

    # Mutations inputs
    input UpdateUsersInput {
        filter: UserFilter!
        set: UserSetFilter
    }


    type Query {

        getProjects: [Project]
        getMentors: [Mentor]
        getProxies: [Proxy]
        getCurrencies: [Currency]
        getUsers(filter: UserFilter): [User]
        getRequests: [Request]
    }


    type Mutation {
        deleteUser(input: UserFilter): [User]
        updateUsers(input: UpdateUsersInput): [User]
        addCurrency(input: CurrencyInput): Currency
        addUser(input: UserInput): User
        addProject(input: ProjectInput): Project
        addMentor(input: MentorInput): Mentor
        addProxy(input: ProxyInput): Proxy
        addRequest(input: RequestInput): Request

    }
`;
