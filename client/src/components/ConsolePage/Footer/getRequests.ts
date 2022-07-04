import {gql} from "@apollo/client";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

export const getRequestsQuery = gql`query GetRequests {
    getRequests {
        _id
        request
        response
        createdAt
    }
}`
export const createGetRequestsQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]) => {
    try {
        return gql`query GetRequests($input: RequestFilter) {
            getRequests(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
        throw  new Error(e)
    }

}

export const ADD_REQUEST = gql`mutation GetRequests($input: RequestInput) {
    addRequest(input: $input) {
        _id, createdAt,request,response
    }
}`
export const DELETE_REQUESTS = gql`mutation DeleteRequests($input: RequestFilter){
    deleteRequests(input: $input){
        _id, createdAt,request,response

    }
}`
export const UPDATE_REQUESTS = gql`mutation UpdateRequests($input: UpdateRequestInput){
    updateRequests(input: $input){
        _id, createdAt,request,response

    }
}`
