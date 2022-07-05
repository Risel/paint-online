import React from "react";
import './styles/app.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:id" element={<Home/>}/>
          <Route path="*" element = {<Navigate to = {`f${(+new Date).toString(16)}`}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
