import _ from "lodash";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

type QueryType = {
  field: String ,
  filter: String | null
}
// TODO: Change filter from object to something more appropriate
type QueryGetUsersType<T extends GraphqlAnyEntityFieldType> = {
  fields: T[]
  filter: Object
}
// Get query object from request string
export const getQuery = <T extends GraphqlAnyEntityFieldType>(request: String): QueryGetUsersType<T> | null => {
  const values = getValues(request)
  if (values) {
    let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
    let queryArr = getQueryArr(fieldsWithFilters)
    return getQueryObjFromQueryArr<T>(queryArr)
  } else return null
}

export const getAddEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String): QueryGetUsersType<T> | null => {
  const values = getValues(request)
  if (values) {
    let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
    let mutations = getQueryArr(fieldsWithFilters, "=")
    return getQueryObjFromQueryArr<T>(mutations)
  } else return null
}

export const getDeleteEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String): QueryGetUsersType<T> | null => {
  const values = getValues(request)
  if (values) {
    let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
    let mutations = getQueryArr(fieldsWithFilters)
    return getQueryObjFromQueryArr<T>(mutations)
  } else return null
}
//TODO : Change return values,
export let getUpdateEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String): { filter: Object; set: Object } | null => {
  let valuesAndSet = getValues(request)
  if (valuesAndSet) {
    let [values, set] = valuesAndSet.split("-set")
    let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
    let filterArr = getQueryArr(fieldsWithFilters)
    let filterObj = getQueryObjFromQueryArr(filterArr)
    let fieldsWithKeys = getFieldsWithFiltersFromValues(set)
    let setArr = getQueryArr(fieldsWithKeys, "=")
    let setObj = getQueryObjFromQueryArr(setArr)

    return {filter: filterObj.filter, set: setObj.filter}
  } else return null
}
//Get array of actual fields from values string
// Example, "name -f 123 | project.name -f 123" => ["name -f 123", "project.name -f 123"]
export const getFieldsWithFiltersFromValues = (values: String): String[] => {
  return values.split("|").map((e: string) => e.trim())
}
// Get array of query object from fields array.
// Example, ["name -f 123", "project.name -f 123"] => [{field: "name", filter: "123"}, {field: "project.name", filter: "123"}]
export const getQueryArr = (fieldsWithFilters: String[], type = "-f"): Array<QueryType> => {
  let queryArr: Array<QueryType> = []
  fieldsWithFilters.forEach((e: String) => {
    if (e.includes(type)) {
      queryArr.push({field: e.split(type)[0].trim() , filter: e.split(type)[1].trim()})
    } else {
      queryArr.push({field: e , filter: null})

    }
  })
  return queryArr
}

//Map dotted field name like "project.mentor.name" to "project{mentor{name}}" so it can be used in graphql requests
export const getGraphqlFieldsFromObj = <T extends GraphqlAnyEntityFieldType>(input: String[]): T[] => {
  let inputArr: String[] = [...input];
  let fieldsArr: T[] = inputArr as T[]
  let bracketPosition = []
  inputArr.forEach((e: String, idx: number) => {
    while (inputArr[idx].includes('.')) {
      inputArr[idx] = inputArr[idx].replace(/\./, "{") + "}"
    }
    fieldsArr[idx] = inputArr[idx] as T

    bracketPosition.push(inputArr[idx].indexOf("}"))

  })
  return fieldsArr
}

// Example: [{field: "name", filter: "11"}] => {fields: ["name"], filter: {name: "11"}}

export const getQueryObjFromQueryArr = <T extends GraphqlAnyEntityFieldType>(queryArr: Array<QueryType>): QueryGetUsersType<T> => {
  let fieldsArr: String[] = []
  let queryObj: any = {}

  queryArr.forEach((e: QueryType, idx: number) => {
    fieldsArr.push(queryArr[idx].field)
    if (queryArr[idx].filter) {
      queryObj = _.set(queryObj, queryArr[idx].field as string, queryArr[idx].filter)
    }
  })
  let fieldsGraphqlArr: T[] = getGraphqlFieldsFromObj<T>(fieldsArr)
  return {fields: fieldsGraphqlArr, filter: queryObj}

}

// Get actual values from request string
export const getValues = (request: String) => {
  if (request.includes("-values")) {
    return request.split('-values')[1]
  }
  return null;
}