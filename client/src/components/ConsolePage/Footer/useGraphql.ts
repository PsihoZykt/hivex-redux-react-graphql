import {MutationHookOptions, useLazyQuery, useMutation} from "@apollo/client";
import {
  ADD_USER,
  createGetUsersQuery,
  DELETE_USERS, getUsersQuery,
  UPDATE_USERS
} from "components/ConsolePage/Footer/graphqlQueries/getUsers.graphql";
import {
  ADD_CURRENCY,
  createGetCurrenciesQuery,
  DELETE_CURRENCIES, getCurrenciesQuery,
  UPDATE_CURRENCIES
} from "components/ConsolePage/Footer/graphqlQueries/getCurrencies.graphql";
import {
  ADD_MENTOR,
  createGetMentorsQuery,
  DELETE_MENTORS, getMentorsQuery,
  UPDATE_MENTORS
} from "components/ConsolePage/Footer/graphqlQueries/getMentors.graphql";
import {
  ADD_PROJECT,
  createGetProjectsQuery,
  DELETE_PROJECTS, getProjectsQuery,
  UPDATE_PROJECTS
} from "components/ConsolePage/Footer/graphqlQueries/getProjects.graphql";
import {
  ADD_PROXY,
  createGetProxiesQuery,
  DELETE_PROXIES, getProxiesQuery,
  UPDATE_PROXIES
} from "components/ConsolePage/Footer/graphqlQueries/getProxies.graphql";
import {
  ADD_REQUEST,
  createGetRequestsQuery,
  DELETE_REQUESTS, getRequestsQuery,
  UPDATE_REQUESTS
} from "components/ConsolePage/Footer/graphqlQueries/getRequests.graphql";


export const useGraphQL = (queryFieldsArr: any, onCompleted: any) => {
  const queryOptions: MutationHookOptions = {
    errorPolicy: "all", onCompleted: (data: any) => {
      onCompleted(JSON.stringify(data, null, "\t"))
    }
  }

  const getUsersObj = useLazyQuery(createGetUsersQuery(queryFieldsArr), queryOptions)
  const getCurrenciesObj = useLazyQuery(createGetCurrenciesQuery(queryFieldsArr), queryOptions)
  const getMentorsObj = useLazyQuery(createGetMentorsQuery(queryFieldsArr), queryOptions)
  const getProjectsObj = useLazyQuery(createGetProjectsQuery(queryFieldsArr), queryOptions)
  const getProxiesObj = useLazyQuery(createGetProxiesQuery(queryFieldsArr), queryOptions)
  const getRequestsObj = useLazyQuery(createGetRequestsQuery(queryFieldsArr), queryOptions)
  const addUserObj = useMutation(ADD_USER, queryOptions)
  const addCurrencyObj = useMutation(ADD_CURRENCY, queryOptions)
  const addMentorObj = useMutation(ADD_MENTOR, queryOptions)
  const addProjectObj = useMutation(ADD_PROJECT, queryOptions)
  const addProxyObj = useMutation(ADD_PROXY, queryOptions)
  const addRequestObj = useMutation(ADD_REQUEST, queryOptions)
  const deleteUsersObj = useMutation(DELETE_USERS, queryOptions)
  const deleteCurrenciesObj = useMutation(DELETE_CURRENCIES, queryOptions)
  const deleteMentorsObj = useMutation(DELETE_MENTORS, queryOptions)
  const deleteProjectsObj = useMutation(DELETE_PROJECTS, queryOptions)
  const deleteProxiesObj = useMutation(DELETE_PROXIES, queryOptions)
  const deleteRequestsObj = useMutation(DELETE_REQUESTS, queryOptions)
  const updateUsersObj = useMutation(UPDATE_USERS, queryOptions)
  const updateCurrenciesObj = useMutation(UPDATE_CURRENCIES, queryOptions)
  const updateMentorsObj = useMutation(UPDATE_MENTORS, queryOptions)
  const updateProjectsObj = useMutation(UPDATE_PROJECTS, queryOptions)
  const updateProxiesObj = useMutation(UPDATE_PROXIES, queryOptions)
  const updateRequestsObj = useMutation(UPDATE_REQUESTS, queryOptions)
  const userFieldsObj = useLazyQuery(getUsersQuery)
  const currencyFieldsObj = useLazyQuery(getCurrenciesQuery)
  const mentorFieldsObj = useLazyQuery(getMentorsQuery)
  const proxyFieldsObj = useLazyQuery(getProxiesQuery)
  const requestFieldsObj = useLazyQuery(getRequestsQuery)
  const projectFieldsObj = useLazyQuery(getProjectsQuery)

  return {
    getUserFields: {exec: userFieldsObj[0], data: userFieldsObj[1]},
    getCurrencyFields: {exec: currencyFieldsObj[0], data: currencyFieldsObj[1]},
    getMentorFields: {exec:  mentorFieldsObj[0], data: mentorFieldsObj[1]},
    getProxyFields: {exec: proxyFieldsObj[0], data: proxyFieldsObj[1]},
    getRequestFields: {exec: requestFieldsObj[0], data: requestFieldsObj[1]},
    getProjectFields: {exec: projectFieldsObj[0], data: projectFieldsObj[1]},

    getUsers: {exec: getUsersObj[0], data: getUsersObj[1]},
    getCurrencies: {exec: getCurrenciesObj[0], data: getCurrenciesObj[1]},
    getMentors: {exec: getMentorsObj[0], data: getMentorsObj[1]},
    getProjects: {exec: getProjectsObj[0], data: getProjectsObj[1]},
    getProxies: {exec: getProxiesObj[0], data: getProxiesObj[1]},
    getRequests: {exec: getRequestsObj[0], data: getRequestsObj[1]},
    addUser: {exec: addUserObj[0], data: addUserObj[1]},
    addCurrency: {exec: addCurrencyObj[0], data: addCurrencyObj[1]},
    addMentor: {exec: addMentorObj[0], data: addMentorObj[1]},
    addProject: {exec: addProjectObj[0], data: addProjectObj[1]},
    addProxy: {exec: addProxyObj[0], data: addProxyObj[1]},
    addRequest: {exec: addRequestObj[0], data: addRequestObj[1]},
    deleteUsers: {exec: deleteUsersObj[0], data: deleteUsersObj[1]},
    deleteCurrencies: {exec: deleteCurrenciesObj[0], data: deleteCurrenciesObj[1]},
    deleteMentors: {exec: deleteMentorsObj[0], data: deleteMentorsObj[1]},
    deleteProjects: {exec: deleteProjectsObj[0], data: deleteProjectsObj[1]},
    deleteProxies: {exec: deleteProxiesObj[0], data: deleteProxiesObj[1]},
    deleteRequests: {exec: deleteRequestsObj[0], data: deleteRequestsObj[1]},
    updateUsers: {exec: updateUsersObj[0], data: updateUsersObj[1]},
    updateCurrencies: {exec: updateCurrenciesObj[0], data: updateCurrenciesObj[1]},
    updateMentors: {exec: updateMentorsObj[0], data: updateMentorsObj[1]},
    updateProjects: {exec: updateProjectsObj[0], data: updateProjectsObj[1]},
    updateProxies: {exec: updateProxiesObj[0], data: updateProxiesObj[1]},
    updateRequests: {exec: updateRequestsObj[0], data: updateRequestsObj[1]},
  }
}
