import React, {useEffect} from 'react';
import {useFriendQuery} from "./generated/graphql";

function App() {
  const {data, loading} = useFriendQuery();
  useEffect(() => {
    if (!loading) {
      console.log(loading, data)
    }
  })
  return (
    <div className="App">
      Hello world
    </div>
  );
}

export default App;
