import {gql} from "@apollo/client";

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
export const createGetMentorsQuery = ({body}: any) => {
    try {
        return gql`query GetMentors($input: MentorFilter) {
            getMentors(input: $input) {
                ${body}
            }
        }`
    } catch (e: any) {
        console.log(e)
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
