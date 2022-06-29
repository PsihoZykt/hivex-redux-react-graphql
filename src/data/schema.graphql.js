import {gql} from "apollo-server-express";


export const typeDefs = gql`

    scalar Date
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
    type Currency {
        _id: ID,
        name: String,
        code: String
    }
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


    input CurrencyInput {
        _id: ID,
        name: String,
        code: String,
    }
    input MentorFilter {
        name: String
    }
    input ProjectFilter {
        name: String
        mentor: MentorFilter
    }
    input UserFilter {
        name: String
        project: ProjectFilter
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
        filter: UserFilter
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


    type Query {

        getProjects: [Project]
        getMentors: [Mentor]
        getProxies: [Proxy]
        getCurrencies: [Currency]
        getUsers(filter: UserFilter): [User]
        getRequests: [Request]
    }


    type Mutation {

        addCurrency(input: CurrencyInput): Currency
        addUser(input: UserInput): User
        addProject(input: ProjectInput): Project
        addMentor(input: MentorInput): Mentor
        addProxy(input: ProxyInput): Proxy
        addRequest(input: RequestInput): Request

    }
`;
