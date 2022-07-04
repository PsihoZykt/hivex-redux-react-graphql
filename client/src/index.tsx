import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, from, InMemoryCache} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {onError} from "@apollo/client/link/error";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement  || document.createElement('div') // for testing purposes
);
const LOCALHOST_GRAPHQL_URI = 'http://localhost:8080/graphql'
const HEROKU_GRAPHQL_URI =  "https://hivex-redux-graphql.herokuapp.com/graphql"
const API_URI = process.env.NODE_ENV === "development" ? LOCALHOST_GRAPHQL_URI :  HEROKU_GRAPHQL_URI
// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
export const client = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache(),
  // link: from([errorLink]),


});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
);
