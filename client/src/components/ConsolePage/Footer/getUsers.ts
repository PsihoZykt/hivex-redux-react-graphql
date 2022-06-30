import {gql} from "@apollo/client";

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
          salary
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

export const createGetUsersQuery = ({body, queryString = {}}: any) => {
    console.log(queryString)
    try {
        return gql`query GetUsers {
            getUsers(filter: ${queryString}) {
                ${body}
            }
        }`
    } catch (e: any) {
        console.log(e)
    }

}

export const ADD_USER = gql`mutation GetUsers($input: UserInput) {
    addUser(input: $input) {
        name, _id
    }
}`
export const DELETE_USERS = gql`mutation DeleteUsers($input: UserFilter){
    deleteUser(input: $input){
        name, _id
    }
}`
export const UPDATE_USERS = gql`mutation UpdateUsers($input: UpdateUsersInput){
    updateUsers(input: $input){
        name, _id
    }
}`