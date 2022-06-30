import {gql} from "@apollo/client";

export const getProxiesQuery = gql`query GetUsers {
    getProxies {
        _id
        name
        country
        timestamp
        bank
        currency {
            _id
            name
            code
        }
    }
}`