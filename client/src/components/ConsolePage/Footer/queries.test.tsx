import {useLazyQuery, useMutation} from "@apollo/client";
import {renderHook} from "@testing-library/react-hooks";
import {MockedProvider} from "@apollo/client/testing";
import {ADD_USER, createGetUsersQuery} from "./graphqlQueries/getUsers.graphql";
import {getAddEntityMutation, getQuery} from "../../../helpers/graphql/graphqlHelper";
import React from "react";
import {createGetCurrenciesQuery} from "components/ConsolePage/Footer/graphqlQueries/getCurrencies.graphql";
import {createGetMentorsQuery} from "components/ConsolePage/Footer/graphqlQueries/getMentors.graphql";
import {createGetProjectsQuery} from "components/ConsolePage/Footer/graphqlQueries/getProjects.graphql";
import {ProxyType, RequestType} from "types/EntityTypes/EntityTypes";
import {createGetRequestsQuery} from "components/ConsolePage/Footer/graphqlQueries/getRequests.graphql";
import {createGetProxiesQuery} from "components/ConsolePage/Footer/graphqlQueries/getProxies.graphql";
import {act} from "react-dom/test-utils";

let createRenderHookOptions = (mocks: any) => ({
    wrapper: ({children}: any) => {
        return <MockedProvider addTypename={false} mocks={mocks}>
            {children}
        </MockedProvider>
    }
})
describe('request input should create appropriate query object, get-entities query should return appropriate result', () => {
    it('get-users query', async () => {
        const input = "hivex get-users -values name |  project.name  | project.mentor.name"
        const query = createGetUsersQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getUsers: {name: '1', project: {name: "1", mentor: {name: "1"}}}}},
                delay: 20,
            },
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({getUsers: {name: "1", project: {name: '1', mentor: {name: "1"}}}});
    });
    it('add-user query', async () => {
        const input = "hivex add-user -values name=11"
        const mutation = getAddEntityMutation(input)
        const ADD_USER_RESULT = {
            addUser: {
                ...mutation.filter,
                _id: "11"
            }
        };
        const variables = {
            input: {
                ...mutation.filter
            }
        };

        const mocks = [
            {
                request: {
                    query: ADD_USER,
                    variables
                },
                result: {data: ADD_USER_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_USER), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addUser= result.current[0];
        act(() => void addUser({ variables }));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        console.log(result.current[1].data)
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_USER_RESULT);
    });
    it('get-currencies query', async () => {
        const input = "hivex get-currencies -values _id | name | code"
        const query = createGetCurrenciesQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getCurrencies: {_id: "2", name: "2", code: "2"}}},
                delay: 20,
            },
        ];
        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({getCurrencies: {_id: "2", name: "2", code: "2"}});
    });
    it('get-mentors query', async () => {
        const input = "hivex get-currencies -values _id | name | level"
        const query = createGetMentorsQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getMentors: {_id: "3", name: "3", level: "junior"}}},
                delay: 20,
            },
        ];
        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({getMentors: {_id: "3", name: "3", level: "junior"}});
    });
    it('get-projects query', async () => {
        const input = "hivex get-projects -values _id | name | projectStatus | mentor.name"
        const query = createGetProjectsQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getProjects: {_id: "4", name: "4", projectStatus: "open", mentor: {name: "4"}}}},
                delay: 20,
            },
        ];
        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({
            getProjects: {
                _id: "4",
                name: "4",
                projectStatus: "open",
                mentor: {name: "4"}
            }
        });
    });
    it('get-requests query', async () => {
        const input = "hivex get-requests -values _id | request | response | createdAt"
        const Entity: RequestType = {_id: "5", request: "5", response: "5", createdAt: new Date()}
        const query = createGetRequestsQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getRequests: Entity}},
                delay: 20,
            },
        ];
        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({
            getRequests: Entity
        });
    });
    it('get-proxies query', async () => {
        const input = "hivex get-proxies -values _id | name | currency.name | bank | country | timestamp | currency._id | currency.code"
        const Entity: ProxyType = {
            bank: "6",
            country: "6",
            timestamp: 0,
            _id: "6", name: "6", currency: {name: "6", _id: "6", code: "6"}
        }
        const query = createGetProxiesQuery(getQuery(input).fields)
        const mocks = [
            {
                request: {query},
                result: {data: {getProxies: Entity}},
                delay: 20,
            },
        ];
        const {result, waitForNextUpdate} = renderHook(
          () => useLazyQuery(query), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const execute = result.current[0];
        setTimeout(() => execute());
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual({
            getProxies: Entity
        });
    });


})
