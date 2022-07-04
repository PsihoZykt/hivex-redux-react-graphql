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

export const getQuery = <T extends GraphqlAnyEntityFieldType>(input: String): QueryGetUsersType<T> => {
  const values = getValues(input)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let queryArr = getQueryArr(fieldsWithFilters)
  return getQueryObjFromQueryArr<T>(queryArr)
}

export const getAddEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String):QueryGetUsersType<T> => {
  const values = getValues(request)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let mutations = getQueryArr(fieldsWithFilters, "=")
  return getQueryObjFromQueryArr<T>(mutations)

}
export const getDeleteEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String):QueryGetUsersType<T> => {
  const values = getValues(request)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let mutations = getQueryArr(fieldsWithFilters)
  return getQueryObjFromQueryArr<T>(mutations)

}
//TODO : Change return values,
export let getUpdateEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String): {filter:  Object, set: Object } => {
  let valuesAndSet = getValues(request)
  let [values, set] = valuesAndSet.split("-set")
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let filterArr = getQueryArr(fieldsWithFilters)
  let filterObj = getQueryObjFromQueryArr(filterArr)
  let fieldsWithKeys = getFieldsWithFiltersFromValues(set)
  let setArr = getQueryArr(fieldsWithKeys, "=")
  let setObj = getQueryObjFromQueryArr(setArr)

  return {filter: filterObj.filter, set: setObj.filter}
}

export const getFieldsWithFiltersFromValues = (values: String): String[] => {
  return values.split("|").map((e: string) => e.trim())
}
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
export const getGraphqlFieldsFromObj = <T extends GraphqlAnyEntityFieldType>(input: String[]): T[] => {
  let fieldsArr: T[] = input as T[]
  let bracketPosition = []
  input.forEach((e: String, idx: number) => {
    while (input[idx].includes('.')) {
      fieldsArr.push(input[idx].replace(/\./, "{") + "}" as T)
    }
    bracketPosition.push(input[idx].indexOf("}"))

  })
  return fieldsArr
}
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


export const getValues = (request: String) => {
  return request.split('-values')[1]
}