import {gql} from "@apollo/client";

export const getRequestsQuery = gql`query GetRequests {
    getRequests {
        _id
        request
        response
        createdAt
    }
}`