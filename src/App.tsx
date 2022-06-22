import React from 'react';
import {gql, useQuery} from "@apollo/client";

const EXCHANGE_RATES = gql`
query{
  getFriends{
    id
    firstName
    lastName
  }
}
`;

function App() {
  const {loading, error, data} = useQuery(EXCHANGE_RATES);
  return (
    <div className="App">
      Hello world
      <div onClick={() => console.log(data)}> Clicl me </div>
    </div>
  );
}

export default App;
