import {gql} from "apollo-server-express";


export const typeDefs = gql`

    scalar Date
    type Project {
        name: String,
        status: ProjectStatus,
        mentor: Mentor,
        country: String,
        duration: Int,
        timestamp: Int,
        techStack: String
    }
    type Request {
        request: String,
        response: String,
        createdAt: Date
    }
    input RequestInput {
        request: String,
        response: String,
        createdAt: Date,
    }
    input ProjectInput {
        name: String,
        status: ProjectStatus,
        mentor: MentorInput,
        country: String,
        duration: Int,
        timestamp: Int,
        techStack: String
    }

    type Mentor {
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }
    input MentorInput {
        name: String,
        level: Level,
        workDuration: Int,
        salary: Int,
        country: String,
        timestamp: Int,
        techStack: String
    }
    type Proxy {
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: Currency
    }
    input ProxyInput {
        name: String,
        country: String,
        timestamp: Int,
        bank: String,
        currency: CurrencyInput
    }
    type Currency {
        id: ID,
        name: String,
        code: String
    }
    type Contact {
        firstName: String
        lastName: String
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
        name: String,
        code: String,
    }

    input UserInput {
        name: String,
        proxy: ProxyInput,
        salary: Int,
        project: ProjectInput,
        workDuration: Int,
        level: Level,
        timestamp: Int,
        techStack: String
    }
    type User {
        id: ID,
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
        getUsers: [User]
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
