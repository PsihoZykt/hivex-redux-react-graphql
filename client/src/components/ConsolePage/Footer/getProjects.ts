import {gql} from "@apollo/client";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

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
export const createGetProjectsQuery = <T extends GraphqlAnyEntityFieldType>(fields: T[]) => {
    try {
        return gql`query GetProjects($input: ProjectFilter) {
            getProjects(input: $input) {
                ${fields}
            }
        }`
    } catch (e: any) {
      throw new Error(e)
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
