import React from "react";
import Newscontainer from "./Components/newsContainer";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
          path="/" 
          element={<Newscontainer/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
