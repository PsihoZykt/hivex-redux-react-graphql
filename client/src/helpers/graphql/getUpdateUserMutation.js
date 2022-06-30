const foo = (input) => {
    const afterValues = input
    let fieldsWithFilters = afterValues.split("|").map(e => e.trim())
    let answer = []
    fieldsWithFilters.forEach(e => {
        if (e.includes("-f")) {
            answer.push({field: e.split(" ")[0], value: e.split("-f")[1]})
        } else {
            answer.push({field: e, value: null})
        }
    })
    let bracketPosition = []

    answer.forEach((e, idx) => {
        while (answer[idx].field.includes('.')) {
            answer[idx].field = answer[idx].field.replace(/\./, "{") + "}"
        }

        bracketPosition.push(answer[idx].field.indexOf("}"))
        if (answer[idx].value) {
            if (bracketPosition[idx] !== -1) {
                answer[idx].value = '"' + answer[idx].field.substr(0, bracketPosition[idx]) + '":' +
                    answer[idx].value +
                    answer[idx].field.substr(bracketPosition[idx])
                answer[idx].value = answer[idx].value.replace(/{/g, '":{"')
            } else answer[idx].value = '"' + answer[idx].field + '"' + ":" + answer[idx].value
        }
    })
    return answer

}


const addUser = (request) => {

    // Get string with filters and fields
    const values = request
    // ["name -f "some name" | project.name"] => ["name -f 'some name' ", "project.name"]
    let fieldsWithFilters = values.split("|").map((e) => e.trim())
    let mutations = []
    let bracketPosition = []
    fieldsWithFilters.forEach((field, idx) => {

        let [userField, value] = field.split("=")
        mutations.push({userField, value})
    })
    console.log(mutations)
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
    return mutations

}

export let getUpdateUsersMutation = (request) => {
    let valuesAndSet = request.split("-values")[1]
    let [values, set] = valuesAndSet.split("-set")

    let filter = '{' + foo(values)[0].value + "}"
    let setValues = "{" + addUser(set)[0].value + "}"

    let mutation = {filter, set: setValues}
    console.log(mutation)
    return mutation
}
