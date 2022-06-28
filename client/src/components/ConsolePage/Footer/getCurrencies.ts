import {gql} from "@apollo/client";

export const getCurrenciesQuery = gql`query GetCurrencies {
    getCurrencies {
        _id
        name
        code
    }
}`

