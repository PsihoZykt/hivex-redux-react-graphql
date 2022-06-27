import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const LOCALHOST_GRAPHQL_URI = 'http://localhost:8080/graphql'
const HEROKU_GRAPHQL_URI =  "https://hivex-redux-graphql.herokuapp.com/graphql"
const API_URI = process.env.NODE_ENV === "development" ? LOCALHOST_GRAPHQL_URI :  HEROKU_GRAPHQL_URI
const client = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()

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
