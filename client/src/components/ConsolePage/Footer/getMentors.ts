import {gql} from "@apollo/client";

export const getMentorsQuery = gql`query GetMentors {
    getMentors {
        name
        level
        workDuration
        salary
        country
        timestamp
        techStack
    }
}`