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
export const createGetProjectsQuery = ({body}: any) => {
    try {
        return gql`query GetProjects($input: ProjectFilter) {
            getProjects(input: $input) {
                ${body}
            }
        }`
    } catch (e: any) {
      console.log(e)
    }

}

export const ADD_PROJECT = gql`mutation GetProject($input: ProjectInput) {
    addProject(input: $input) {
        name, _id
    }
}`
export const DELETE_PROJECTS = gql`mutation DeleteProjects($input: ProjectFilter){
    deleteProjects(input: $input){
        name, _id
    }
}`
export const UPDATE_PROJECTS = gql`mutation UpdateProjects($input: UpdateProjectInput){
    updateProjects(input: $input){
        name, _id
    }
}`
