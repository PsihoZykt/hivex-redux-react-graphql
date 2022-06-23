import {gql} from "apollo-server-express";

export const typeDefs = gql`

  type User {
  id: ID,
  name: String,
  proxy: Proxy,
  salary: Int, 
  project: Project,
  workDuration: Int,
  role: Role,
  techStack: String,
  timeStamp: Int,
  }
    type Project {
    id: ID,
    name: String,
    worker: User,
    status: ProjectStatus,
    mentor: Mentor,
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
    type Proxy {
    name: String,
    country: String,
    timestamp: Int,
    bank: String,
    currency: Currency
    }
    type Currency {
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
  proxy: String,
  salary: Int,
  project: ProjectInput,
  workDuration: Int,
  level: Level,
  timestamp: Int,
  techStack: String
  }
input ProjectInput {
name: String,
worker: String,
status: ProjectStatus,
mentor: String,
country: String,
duration: Int,
timestamp: Int,
techStack: String
}
  type Query {
 
    getProject: [Project]
    getMentors: [Mentor]
    getProxies: [Proxy]
    getCurrencies: [Currency]
    
  getUsers: [User]
  }
  

  type Mutation {
  
    addCurrency(currencies: CurrencyInput): Currency
    addUser(users: UserInput): User
  }
`;
