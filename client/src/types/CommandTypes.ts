
export enum CommandNames {
  GET_FIELDS = "get-fields",

  GET_USERS = "get-users",
  ADD_USER = "add-user",
  DELETE_USERS = "delete-users",
  UPDATE_USERS = "update-users",

  GET_CURRENCIES = "get-currencies",
  ADD_CURRENCY = "add-currency",
  DELETE_CURRENCIES = "delete-currencies",
  UPDATE_CURRENCIES = "update-currencies",

  GET_MENTORS = "get-mentors",
  ADD_MENTOR = "add-mentors",
  DELETE_MENTORS = "delete-mentors",
  UPDATE_MENTORS = "update-mentors",

  GET_PROJECTS = "get-projects",
  ADD_PROJECT = "add-project",
  DELETE_PROJECTS = "delete-projects",
  UPDATE_PROJECTS = "update-projects",

  GET_PROXIES = "get-proxies",
  ADD_PROXY = "add-proxy",
  DELETE_PROXIES = "delete-proxies",
  UPDATE_PROXIES = "update-proxies",

  GET_REQUESTS = "get-requests",
  ADD_REQUEST = "add-request",
  DELETE_REQUESTS = "delete-requests",
  UPDATE_REQUESTS = "update-requests",

  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up"

}

export enum Fields {
  USERS = 'users',
  CURRENCIES = "currencies",
  MENTORS = "mentors",
  PROXIES = "proxies",
  REQUESTS = "requests",
  PROJECTS = "projects"
}


export type CommandType = {
  prefix: "hivex"
  commandName: CommandNames
  valuesKey: "-values"
}
