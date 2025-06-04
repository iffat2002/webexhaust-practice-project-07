
import "./styles/main.scss";
import React, {  Suspense } from "react";
import Home from "./components/Home";

function App() {

 
  return (
      <Suspense fallback={<div>Loading...</div>}>
    <Home />
  </Suspense>
  );
}

export default App;
