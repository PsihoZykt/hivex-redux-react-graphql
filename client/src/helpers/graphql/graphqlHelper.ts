import _ from "lodash";
import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

type QueryType = {
  field: String ,
  filter: String | null
}
type QueryGetUsersType<T extends GraphqlAnyEntityFieldType> = {
  fields: T[]
  filter: Object
}

export const getQuery = <T extends GraphqlAnyEntityFieldType>(input: String): QueryGetUsersType<T> => {
  const values = getValues(input)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let queryArr = getQueryArr(fieldsWithFilters)
  return getQueryObjFromQueryArr(queryArr)
}

export const getAddEntityMutation = <T extends GraphqlAnyEntityFieldType>(request: String) => {
  const values = getValues(request)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let mutations = getQueryArr(fieldsWithFilters, "=")
  let mutationObj: QueryGetUsersType<T> = getQueryObjFromQueryArr(mutations)
  return mutationObj

}
export const getDeleteEntityMutation = (request: String) => {
  const values = getValues(request)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let mutations = getQueryArr(fieldsWithFilters)
  let mutationObj = getQueryObjFromQueryArr(mutations)
  return mutationObj

}
export let getUpdateEntityMutation = (request: String) => {
  //update-users -values a -f 1 | b -f 2 -set a=123
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
  return values.split("|").map((e: any) => e.trim())
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
export const getGraphqlFieldsFromObj = (input: String[]): GraphqlAnyEntityFieldType[] => {
  let fieldsArr: GraphQLUserFieldType[] = input as GraphQLUserFieldType[]
  let bracketPosition = []
  input.forEach((e: String, idx: number) => {
    while (input[idx].includes('.')) {
      fieldsArr.push(input[idx].replace(/\./, "{") + "}" as GraphQLUserFieldType)
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
  let fieldsGraphqlArr: any = getGraphqlFieldsFromObj(fieldsArr)
  return {fields: fieldsGraphqlArr, filter: queryObj}

}


export const getValues = (request: String) => {
  const values = request.split('-values')[1]
  return values
}