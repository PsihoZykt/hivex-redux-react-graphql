import React from 'react';
import ConsolePage from "components/ConsolePage/ConsolePage";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ConsolePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
