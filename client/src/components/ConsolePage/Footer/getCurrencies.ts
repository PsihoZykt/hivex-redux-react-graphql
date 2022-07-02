import {gql} from "@apollo/client";

export const getCurrenciesQuery = gql`query GetCurrencies {
    getCurrencies {
        _id
        name
        code
    }
}`
export const createGetCurrenciesQuery = ({body}: any) => {
    try {
        return gql`query GetCurrencies($input: CurrencyFilter) {
            getCurrencies(input: $input) {
                ${body}
            }
        }`
    } catch (e: any) {
        console.log(e)
    }

}

export const ADD_CURRENCY = gql`mutation AddCurrency($input: CurrencyInput) {
    addCurrency(input: $input) {
        name, _id
    }
}`
export const DELETE_CURRENCIES = gql`mutation DeleteCurrencies($input: CurrencyFilter){
    deleteCurrencies(input: $input){
        name, _id
    }
}`
export const UPDATE_CURRENCIES = gql`mutation UpdateCurrencies($input: UpdateCurrencyInput){
    updateCurrencies(input: $input){
        name, _id
    }
}`
