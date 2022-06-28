import {gql} from "@apollo/client";

export const getRequestsQuery = gql`query GetRequests {
    getRequests {
        request
        response
        createdAt
    }
}`