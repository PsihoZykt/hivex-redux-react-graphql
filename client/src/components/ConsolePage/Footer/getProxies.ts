import {gql} from "@apollo/client";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

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
export const createGetProxiesQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]) => {
    try {
        return gql`query GetProxies($input: ProxyFilter) {
            getProxies(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
       throw new Error(e)
    }

}

export const ADD_PROXY = gql`mutation GetProxies($input: ProxyInput) {
    addProxy(input: $input) {
        name, _id
    }
}`
export const DELETE_PROXIES = gql`mutation DeleteProxies($input: ProxyFilter){
    deleteProxies(input: $input){
        name, _id
    }
}`
export const UPDATE_PROXIES = gql`mutation UpdateProxies($input: UpdateProxyInput){
    updateProxies(input: $input){
        name, _id
    }
}`
