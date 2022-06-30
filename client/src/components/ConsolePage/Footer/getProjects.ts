import {gql} from "@apollo/client";

export const getProjectsQuery = gql`query GetProjects {
  getProjects {
      _id
    name
    status
    mentor {
        _id
      salary
      workDuration
      level
      name
      country
      timestamp
      techStack
    }
    country
    duration
    timestamp
    techStack
  }
}`