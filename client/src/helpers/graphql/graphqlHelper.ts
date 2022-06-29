import _ from "lodash";

export const getFields = (request: any) => {
console.log(request)
  let requestValues = request.split("-values")[1].split("|")
  console.log(requestValues)
  requestValues.forEach((value: any, idx: any) => {
    requestValues[idx] = value.trim()
  })
  let fields = requestValues.join(" ")
  return fields

}

export const getUsersQueryFields = (request: any) => {
  let requestValues = request.split("-values")
  requestValues = requestValues[1].trim().split(" ")
  requestValues.forEach((value: any, idx: any) => {
    requestValues[idx] = value.trim()
  })

  let newObj = {}
  requestValues.forEach((item: any) => _.set(newObj, item, null))
  let newObjJSON = ""
  newObjJSON = JSON.stringify(newObj).replace(/"/g, "").replace(/:null/g, "").replace(/:/g, "").replace(/^.|.$/g, "").replace(/,/g, " ")
return newObjJSON
}