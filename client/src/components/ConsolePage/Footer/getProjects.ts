import {gql} from "@apollo/client";

export const getProjectsQuery = gql`query GetProjects {
  getProjects {
    name
    status
    mentor {
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