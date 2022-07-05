import TestRenderer from "react-test-renderer";

import {MockedProvider} from "@apollo/client/testing";

import {Footer} from "./Footer";
import {expect, it} from "@jest/globals";
import {createGetUsersQuery} from "./graphqlQueries/getUsers.graphql";
import '@testing-library/jest-dom'
import {gql, useQuery} from "@apollo/client";
import {getQuery} from "../../../helpers/graphql/graphqlHelper";
import {createGetProjectsQuery} from "./graphqlQueries/getProjects.graphql";
import {act, render} from "@testing-library/react";
import {createGetCurrenciesQuery} from "./graphqlQueries/getCurrencies.graphql";
import {createGetMentorsQuery} from "./graphqlQueries/getMentors.graphql";
import {createGetProxiesQuery} from "./graphqlQueries/getProxies.graphql";
import {createGetRequestsQuery} from "./graphqlQueries/getRequests.graphql";
import {useGetUsers} from "./getUsers";

const mocks = []; // We'll fill this in next

it("renders without error", () => {
    const {getByText} = render(
        <MockedProvider>
            <Footer/>
        </MockedProvider>
    );

    expect(getByText("Loading...")).toBeInTheDocument()


});
it("should render loading state initially", () => {


    const user = {name: "1"};
    const mocks = [

        {

            request: {

                query: createGetUsersQuery(["name", "_id"]),

                variables: {input: {name: "123"}},

            },

            result: {data: user},

        },

    ];
    let response

    const component = TestRenderer.create(
        <MockedProvider mocks={null} addTypename={false}>

            <Footer setResponse={(body) => response = body} request={"dsa"}/>

        </MockedProvider>
    );
    // find the button and simulate a click
    //
    const button = component.root.findByType("button");
    button.props.onClick(); // fires the mutation
    expect(response).toMatch(/Incorrect command/);

});
describe("all get-commands should work", () => {

    test("createGetUsersQuery with name should create correct queries", () => {
        let input = "hivex get-users -values name"
        let queryObj = getQuery(input)
        const query = createGetUsersQuery(queryObj.fields)
        expect(query).toEqual(
            gql`query GetUsers($input: UserFilter) {
                getUsers(input: $input) {
                    name
                }
            }`)
    });
    test("createGetUsersQuery with name project.name should create correct queries", () => {
        let input = "hivex get-users -values name | project.name"
        let queryObj = getQuery(input)
        const query = createGetUsersQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetUsers($input: UserFilter)
        { getUsers(input: $input) {
            name project{name}
        }
        }`)
    });
    test("createGetUsersQuery with _id name project{name mentor{name}} should create correct queries", async () => {
        const user = {name: "1"};
        const mocks = [

            {

                request: {

                    query: createGetUsersQuery(["name", "_id"]),

                    variables: {input: {name: "123"}},

                },

                result: {data: user},

            },

        ];
        let input = "hivex get-users -values _id | name | project.name | project.mentor.name"
        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>

                <Footer setResponse={(body) => console.log(body)} request={input}/>

            </MockedProvider>
        );

       const mock =  jest.mock('./getUsers')
        const button = component.root.findByType("button");
        button.props.onClick(); // fires the mutation
        expect(mock).toHaveBeenCalled()



        // expect(response).toMatch(/Incorrect command/);
        // let queryObj = getQuery(input)
        // const query = createGetUsersQuery(queryObj.fields)
        //
        // console.log(query)
        // expect(query).toEqual(gql`query GetUsers($input: UserFilter)
        // { getUsers(input: $input) {
        //     _id name project{name mentor {
        //         name
        //     }}
        // }
        // }`)
    });


    test('createGetProjectsQuery should create correct query', () => {

        let input = "hivex get-projects -values name"
        let queryObj = getQuery(input)
        const query = createGetProjectsQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetProjects($input: ProjectFilter) { getProjects(input: $input) {
            name
        }
        }`)
    })
    test('createGetCurrenciesQuery should create correct query', () => {

        let input = "hivex get-currencies -values name"
        let queryObj = getQuery(input)
        const query = createGetCurrenciesQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetCurrencies($input: CurrencyFilter) { getCurrencies(input: $input) {
            name
        }
        }`)
    })
    test('createGetMentorsQuery should create correct query', () => {

        let input = "hivex get-mentors -values name"
        let queryObj = getQuery(input)
        const query = createGetMentorsQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetMentors($input: MentorFilter) { getMentors(input: $input) {
            name
        }
        }`)
    })
    test('createGetProxyQuery should create correct query', () => {

        let input = "hivex get-proxies -values name"
        let queryObj = getQuery(input)
        const query = createGetProxiesQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetProxies($input: ProxyFilter) { getProxies(input: $input) {
            name
        }
        }`)
    })
    test('createGetRequestsQuery should create correct query', () => {
        let input = "hivex get-requests -values response"
        let queryObj = getQuery(input)
        const query = createGetRequestsQuery(queryObj.fields)
        expect(query).toEqual(gql`query GetRequests($input: RequestFilter) { getRequests(input: $input) {
            response
        }
        }`)
    })



})