import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Provider} from 'react-redux'
import {store} from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
  uri: 'https://hivex-redux-graphql.herokuapp.com/graphql',
  cache: new InMemoryCache()

});

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </ApolloProvider>
  </Provider>
);
