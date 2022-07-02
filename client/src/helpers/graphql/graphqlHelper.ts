import _ from "lodash";

type QueryType = {
  field: String,
  filter: String | null
}
type QueryGetUsersType = {
  fields: String,
  filter: Object
}
export const getQuery = (input: String): QueryGetUsersType => {
  const values = getValues(input)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let queryArr = getQueryArr(fieldsWithFilters)
  let queryObj = getQueryObjFromQueryArr(queryArr)
  return queryObj
}

export const getAddEntityMutation = (request: String) => {

  const values = getValues(request)
  let fieldsWithFilters = getFieldsWithFiltersFromValues(values)
  let mutations = getQueryArr(fieldsWithFilters, "=")
  let mutationObj: QueryGetUsersType = getQueryObjFromQueryArr(mutations)
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
      queryArr.push({field: e.split(type)[0].trim(), filter: e.split(type)[1].trim()})
    } else {
      queryArr.push({field: e, filter: null})

    }
  })
  return queryArr
}
export const getGraphqlFieldsFromObj = (input: String[]) => {
  let fieldsArr = input
  let bracketPosition = []
  fieldsArr.forEach((e: String, idx: number) => {
    while (fieldsArr[idx].includes('.')) {
      fieldsArr[idx] = fieldsArr[idx].replace(/\./, "{") + "}"
    }
    bracketPosition.push(fieldsArr[idx].indexOf("}"))

  })
  return fieldsArr.join(" ")
}
export const getQueryObjFromQueryArr = (queryArr: Array<QueryType>): any => {
  let fieldsArr: String[] = []
  let queryObj: any = {}
  queryArr.forEach((e: QueryType, idx: number) => {
    fieldsArr.push(queryArr[idx].field)
    if (queryArr[idx].filter) {
      queryObj = _.set(queryObj, queryArr[idx].field as string, queryArr[idx].filter)
    }
  })
  let fieldsGraphqlString = getGraphqlFieldsFromObj(fieldsArr)
  return {fields: fieldsGraphqlString, filter: queryObj}

}


export const getValues = (request: String) => {
  const values = request.split('-values')[1]
  return values
}