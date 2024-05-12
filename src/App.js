import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Empty from './Components/Empty';
import TaskComponent from './Components/TaskComponent';
import React from 'react';
import ListTaskComponent from './Components/ListTaskComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';


function App() {


  return (
    <div>
     
      <BrowserRouter>
      
      <HeaderComponent/>
      
      <Routes>
        
      <Route index element ={<Home />}/>
      
        <Route path='/home' element ={<Home />} />

          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element = {<Register/>} />
          <Route path='/empty' element = {<Empty/>} />
          {/* add task*/}
          <Route path='/home' element= {<ListTaskComponent/>}></Route>
          <Route path='/add-task' element = {<TaskComponent />}></Route>
          <Route path='/edit-task/:id' element = {<TaskComponent />}></Route>
      </Routes>
      <FooterComponent/>
    
      </BrowserRouter>
     
    </div>
    
  );
}

export default App;
