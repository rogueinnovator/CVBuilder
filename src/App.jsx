import React from 'react';
import CVForm from './pages/CVForm';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/form' element={<CVForm />}></Route>
      </Routes>
    </div>
  );
};
export default App;
