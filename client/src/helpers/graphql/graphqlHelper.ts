type QueryType = {
  fields: String,
  filter: String | null
}
export const getQuery = (request: String): QueryType => {
// Get string with filters and fields (hivex get-users -values name -f "some name" | project.name => ["name -f "some name" | project.name"])
  const values = request.split('-values')[1]
// Get array of fields with filters
  // ["name -f "some name" | project.name"] => ["name -f 'some name' ", "project.name"]
  let fieldsWithFilters = values.split("|").map((e: String) => e.trim())
  let queriesArr: QueryType[] = []
// Get array of objects, where field is something before -f, and value if something after -f
  // ["name -f "some name", "project.name"] => [{fields: name, filter: "some name"}, {fields: "project.name", filter: null}]
  fieldsWithFilters.forEach((e: string) => {
    if (e.includes("-f")) {
      queriesArr.push({fields: e.split(" ")[0], filter: e.split("-f")[1]})
    } else {
      queriesArr.push({fields: e, filter: null})
    }
  })


  // Now we need to save first "}" position, so we can place string before it
  let bracketPosition: number[] = []
// now we need to change field dotted object to correspond GraphQL syntax
  // [{fields: "project.name", filter: null}] => [{fields: "project{name} ]

  queriesArr.forEach((e: QueryType, idx: number) => {
    while (queriesArr[idx].fields.includes('.')) {
      queriesArr[idx].fields = queriesArr[idx].fields.replace(/\./, "{") + "}"
    }
    bracketPosition.push(queriesArr[idx].fields.indexOf("}"))

    // now we need to change field value to correspond graphql filter syntax
    // if we have project.mentor.name -f "some name" we need to convert "some name" to
    // project: { mentor: { name: "some name" } }
    if (queriesArr[idx].filter) {
      if (bracketPosition[idx] !== -1) {
        queriesArr[idx].filter = queriesArr[idx].fields.substr(0, bracketPosition[idx]) + ":" +
          queriesArr[idx].filter +
          queriesArr[idx].fields.substr(bracketPosition[idx])
        queriesArr[idx].filter = queriesArr[idx].filter!.replace(/{/g, ":{")
      } else queriesArr[idx].filter = queriesArr[idx].fields + ":" + queriesArr[idx].filter
    }
  })

// now we just get one object with all fields and values
  let query = {fields: "", filter: ""}
  queriesArr.forEach((e: QueryType) => {
    query.fields += e.fields + " "
    console.log(query.filter)
    query.filter += e.filter ? e.filter + "," : ""
  })
  query.filter = "{" + query.filter + "}"
  return query
}
export const getFields = (request: String) => {
  const fields = request.split('-values')[1]
  return fields
}
export const getAddUserMutation = (request: String) => {

  // Get string with filters and fields
  const values = request.split('-values')[1]
  // ["name -f "some name" | project.name"] => ["name -f 'some name' ", "project.name"]
  let fieldsWithFilters = values.split("|").map((e) => e.trim())
  let mutations: Array<{ userField: String, value: String }> = []
  let bracketPosition: number[] = []
  fieldsWithFilters.forEach((field, idx) => {

    let [userField, value] = field.split("=")
    mutations.push({userField, value})
  })
  mutations.forEach((field, idx) => {
    while (field.userField.includes(".")) {
      field.userField = field.userField.replace(/\./, "{") + "}"
    }
    bracketPosition.push(mutations[idx].userField.indexOf("}"))
    if (bracketPosition[idx] !== -1) {
      mutations[idx].value = '"' + mutations[idx].userField.substr(0, bracketPosition[idx]) + '":' +
        mutations[idx].value +
        mutations[idx].userField.substr(bracketPosition[idx])
      mutations[idx].value = mutations[idx].value.replace(/{/g, '":{"')
    } else mutations[idx].value = '"' + mutations[idx].userField + '":' + mutations[idx].value
  })
  let mutation = {userFields: "", value: ""}
  mutations.forEach((e: any, idx) => {
    mutation.userFields += e.userFields + " "
    mutation.value += e.value + (idx !== mutations.length - 1 ? ", " : "")
  })
  mutation.value = "{" + mutation.value + "}"
  return mutation

}
export const getDeleteUserMutation = (request: String) => {
  // Get string with filters and fields (hivex get-users -values name -f "some name" | project.name => ["name -f "some name" | project.name"])
  const values = request.split('-values')[1]
// Get array of fields with filters
  // ["name -f "some name" | project.name"] => ["name -f 'some name' ", "project.name"]
  let fieldsWithFilters = values.split("|").map((e: String) => e.trim())
  let queriesArr: QueryType[] = []
// Get array of objects, where field is something before -f, and value if something after -f
  // ["name -f "some name", "project.name"] => [{fields: name, filter: "some name"}, {fields: "project.name", filter: null}]
  fieldsWithFilters.forEach((e: string) => {
    if (e.includes("-f")) {
      queriesArr.push({fields: e.split(" ")[0], filter: e.split("-f")[1]})
    } else {
      queriesArr.push({fields: e, filter: null})
    }
  })


  // Now we need to save first "}" position, so we can place string before it
  let bracketPosition: number[] = []
// now we need to change field dotted object to correspond GraphQL syntax
  // [{fields: "project.name", filter: null}] => [{fields: "project{name} ]

  queriesArr.forEach((e: QueryType, idx: number) => {
    while (queriesArr[idx].fields.includes('.')) {
      queriesArr[idx].fields = queriesArr[idx].fields.replace(/\./, "{") + "}"
    }
    bracketPosition.push(queriesArr[idx].fields.indexOf("}"))

    // now we need to change field value to correspond graphql filter syntax
    // if we have project.mentor.name -f "some name" we need to convert "some name" to
    // project: { mentor: { name: "some name" } }
    if (queriesArr[idx].filter) {
      if (bracketPosition[idx] !== -1) {
        queriesArr[idx].filter = '"' + queriesArr[idx].fields.substr(0, bracketPosition[idx]) + '":' +
          queriesArr[idx].filter +
          queriesArr[idx].fields.substr(bracketPosition[idx])
        queriesArr[idx].filter = queriesArr[idx].filter!.replace(/{/g, '":{"')
      } else queriesArr[idx].filter = '"' + queriesArr[idx].fields + '":' + queriesArr[idx].filter
    }
  })

// now we just get one object with all fields and values
  let query = {fields: "", filter: ""}
  queriesArr.forEach((e: QueryType) => {
    query.fields += e.fields + " "
    query.filter += e.filter ? e.filter : "" + ", "
  })
  query.filter = "{" + query.filter + "}"
  return query

}