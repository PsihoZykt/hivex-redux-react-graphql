import {gql} from "@apollo/client";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

export const getMentorsQuery = gql`query GetMentors {
    getMentors {
        _id
        name
        level
        workDuration
        salary
        country
        timestamp
        techStack
    }
}`
export const createGetMentorsQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]) => {
    try {
        return gql`query GetMentors($input: MentorFilter) {
            getMentors(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
        throw new Error(e)
    }

}

export const ADD_MENTOR = gql`mutation AddMentor($input: MentorInput) {
    addMentor(input: $input) {
        name, _id
    }
}`
export const DELETE_MENTORS = gql`mutation DeleteMentors($input: MentorFilter){
    deleteMentors(input: $input){
        name, _id
    }
}`
export const UPDATE_MENTORS = gql`mutation UpdateMentors($input: UpdateMentorInput){
    updateMentors(input: $input){
        name, _id
    }
}`
