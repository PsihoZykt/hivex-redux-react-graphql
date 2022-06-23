import React, {useEffect} from 'react';
// import {useFriendQuery} from "./generated/graphql";
import {gql, useMutation} from "@apollo/client";

function App() {
  // const {data, loading} = useExampleQueryQuery();
  // const [mutateFunction, {data, loading, error}] = useCurrencyMutation();
  const mutation = gql`mutation {
  addCurrency (
    currencies: {
      code: "dsa",
      name: "das"
    }
  ){
    code
name
  }
}

`
  const [mutateFunction, {data, loading, error}] = useMutation(mutation);
  useEffect(() => {
    console.log(loading)


    if (!loading) console.log(data)
  }, [loading])

  return (
    <div onClick={() => {
      mutateFunction({variables: {currencies: {code: "1", name: "2"}}}).then(r => console.log("Mutation", data));

    }} className="App">
      Hello world
    </div>
  );
}

export default App;
