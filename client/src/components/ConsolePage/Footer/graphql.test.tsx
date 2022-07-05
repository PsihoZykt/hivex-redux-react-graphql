import {useLazyQuery, useMutation} from "@apollo/client";
import {renderHook} from "@testing-library/react-hooks";
import {MockedProvider} from "@apollo/client/testing";
import {ADD_USER, createGetUsersQuery} from "./graphqlQueries/getUsers.graphql";
import {getAddEntityMutation, getQuery, getUpdateEntityMutation} from "../../../helpers/graphql/graphqlHelper";
import React from "react";
import {
    ADD_CURRENCY,
    createGetCurrenciesQuery, UPDATE_CURRENCIES
} from "components/ConsolePage/Footer/graphqlQueries/getCurrencies.graphql";
import {
    ADD_MENTOR,
    createGetMentorsQuery,
    UPDATE_MENTORS
} from "components/ConsolePage/Footer/graphqlQueries/getMentors.graphql";
import {
    ADD_PROJECT,
    createGetProjectsQuery,
    UPDATE_PROJECTS
} from "components/ConsolePage/Footer/graphqlQueries/getProjects.graphql";
import {ProxyType, RequestType} from "types/EntityTypes/EntityTypes";
import {ADD_REQUEST, createGetRequestsQuery} from "components/ConsolePage/Footer/graphqlQueries/getRequests.graphql";
import {ADD_PROXY, createGetProxiesQuery} from "components/ConsolePage/Footer/graphqlQueries/getProxies.graphql";
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
    it('add-user mutation', async () => {
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
        const addUser = result.current[0];
        act(() => void addUser({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_USER_RESULT);
    });
    it('add-mentor mutation', async () => {
        const input = "hivex add-user -values name=11"
        const mutation = getAddEntityMutation(input)
        const ADD_MENTOR_RESULT = {
            addMentor: {
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
                    query: ADD_MENTOR,
                    variables
                },
                result: {data: ADD_MENTOR_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_MENTOR), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addMentor = result.current[0];
        act(() => void addMentor({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_MENTOR_RESULT);
    });
    it('add-project mutation', async () => {
        const input = "hivex add-project -values name=11"
        const mutation = getAddEntityMutation(input)
        const ADD_PROJECT_RESULT = {
            addProject: {
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
                    query: ADD_PROJECT,
                    variables
                },
                result: {data: ADD_PROJECT_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_PROJECT), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addProject = result.current[0];
        act(() => void addProject({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_PROJECT_RESULT);
    });
    it('add-currency mutation', async () => {
        const input = "hivex add-currency -values name=11"
        const mutation = getAddEntityMutation(input)
        const ADD_CURRENCY_RESULT = {
            addCurrency: {
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
                    query: ADD_CURRENCY,
                    variables
                },
                result: {data: ADD_CURRENCY_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_CURRENCY), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addCurrency = result.current[0];
        act(() => void addCurrency({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_CURRENCY_RESULT);
    });
    it('add-proxy mutation', async () => {
        const input = "hivex add-proxy -values name=11"
        const mutation = getAddEntityMutation(input)
        const ADD_PROXY_RESULT = {
            addProxy: {
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
                    query: ADD_PROXY,
                    variables
                },
                result: {data: ADD_PROXY_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_PROXY), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addProxy = result.current[0];
        act(() => void addProxy({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_PROXY_RESULT);
    });
    it('add-request mutation', async () => {
        const input = "hivex add-request -values request=11 | response=11"
        const mutation = getAddEntityMutation(input)
        const ADD_REQUEST_RESULT = {
            addRequest: {
                ...mutation.filter,
                createdAt: new Date(),
                _id: "11"
            }
        };
        const variables = {
            input: {
                ...mutation.filter,
            }
        };

        const mocks = [
            {
                request: {
                    query: ADD_REQUEST,
                    variables
                },
                result: {data: ADD_REQUEST_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(ADD_REQUEST), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const addRequest = result.current[0];
        act(() => void addRequest({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(ADD_REQUEST_RESULT);
    });

    it('update-currencies mutation', async () => {
        const input = "hivex update-currencies -values name -f 1 -set name=2"
        const mutation = getUpdateEntityMutation(input)
        const UPDATE_CURRENCIES_RESULT = {
            updateCurrencies: {
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
                    query: UPDATE_CURRENCIES,
                    variables
                },
                result: {data: UPDATE_CURRENCIES_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(UPDATE_CURRENCIES), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const updateCurrencies = result.current[0];
        act(() => void updateCurrencies({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(UPDATE_CURRENCIES_RESULT);
    });
    it('update-mentors mutation', async () => {
        const input = "hivex update-mentors -values name -f 1 -set name=2"
        const mutation = getUpdateEntityMutation(input)
        const UPDATE_MENTORS_RESULT = {
            updateMentors: {
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
                    query: UPDATE_MENTORS,
                    variables
                },
                result: {data: UPDATE_MENTORS_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(UPDATE_MENTORS), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const updateMentors = result.current[0];
        act(() => void updateMentors({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(UPDATE_MENTORS_RESULT);
    });
    it('update-projects mutation', async () => {
        const input = "hivex update-projects -values name -f 1 -set name=2"
        const mutation = getUpdateEntityMutation(input)
        const UPDATE_PROJECTS_RESULT = {
            updateProjects: {
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
                    query: UPDATE_PROJECTS,
                    variables
                },
                result: {data: UPDATE_PROJECTS_RESULT}
            }
        ];


        const {result, waitForNextUpdate} = renderHook(
          () => useMutation(UPDATE_PROJECTS), createRenderHookOptions(mocks)
        );

        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toBe(undefined);
        const updateProjects = result.current[0];
        act(() => void updateProjects({variables}));
        expect(result.current[1].loading).toBe(true);
        expect(result.current[1].data).toBe(undefined);

        await waitForNextUpdate();
        expect(result.current[1].loading).toBe(false);
        expect(result.current[1].data).toEqual(UPDATE_PROJECTS_RESULT);
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
