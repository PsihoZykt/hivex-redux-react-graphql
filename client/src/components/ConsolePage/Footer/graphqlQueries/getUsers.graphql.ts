import {DocumentNode} from "@apollo/client";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";
import {gql} from 'graphql-tag'

export const getUsersQuery =
  gql`query GetUsers {
      getUsers {
          _id
          name
          proxy {
              _id
              name
              timestamp
              country
              bank
              currency {
                  _id
                  name
                  code
              }
          }
          salary,
          workDuration,
          level,
          techStack,
          timeStamp,
          project {
              _id
              name
              status
              mentor {
                  _id
                  salary
                  workDuration
                  level
                  name
                  country
                  timestamp
                  techStack
              }
              country
              duration
                    timestamp
                    techStack
                }
                workDuration
                level
                techStack
                timeStamp
            }
        }`

export const createGetUsersQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]): DocumentNode => {
    try {
        return gql`query GetUsers($input: UserFilter) {
            getUsers(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
        throw new Error(e)
    }

}

export const ADD_USER = gql`mutation addUser($input: UserInput) {
    addUser(input: $input) {
        name, _id
    }
}`
export const DELETE_USERS = gql`mutation DeleteUsers($input: UserFilter){
    deleteUsers(input: $input){
        name, _id
    }
}`
export const UPDATE_USERS = gql`mutation UpdateUsers($input: UpdateUsersInput){
    updateUsers(input: $input){
        name, _id
    }
}`

export const SIGN_IN = gql`mutation SignIn($input: SignInInput!){
    signIn(input: $input)
}`
export const SIGN_UP = gql`mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
}`
export const AUTH = gql`query Auth {
    auth {
        email
    }
}`