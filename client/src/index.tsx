import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {setContext} from "@apollo/client/link/context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement  || document.createElement('div') // for testing purposes
);
const LOCALHOST_GRAPHQL_URI = 'http://localhost:8080/graphql'
const HEROKU_GRAPHQL_URI =  "https://hivex-redux-graphql.herokuapp.com/graphql"
const API_URI = process.env.NODE_ENV === "development" ? LOCALHOST_GRAPHQL_URI :  HEROKU_GRAPHQL_URI
const httpLink = createHttpLink({
  uri: API_URI,
});


const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }

});
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),


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
