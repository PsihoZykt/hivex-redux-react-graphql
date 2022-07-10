import {gql} from "@apollo/client";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

export const getCurrenciesQuery = gql`query GetCurrencies {
    getCurrencies {
        _id
        name
        code
    }
}`
export const createGetCurrenciesQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]) => {
    try {
        return gql`query GetCurrencies($input: CurrencyFilter) {
            getCurrencies(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
        throw new Error(e)
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
