import {gql} from "@apollo/client";

export const getUsersQuery =
  gql`query GetUsers {
            getUsers {
                _id
                name
                proxy {
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
                    name
                    status
                    mentor {
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

export const createGetUsersQuery = (body: String) => {
    try {
        return gql`query GetUsers {
            getUsers {
                ${body}
            }
        }`
    } catch (e) {
        return gql`query  getUsers{ getUsers {
            name
        }}`
    }

}