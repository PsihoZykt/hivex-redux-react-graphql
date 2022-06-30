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