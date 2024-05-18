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

import axios from 'axios';

const REST_API_BASE_URL = 'http://task-management-api-env.eba-esuuzu4p.ap-south-1.elasticbeanstalk.com/api/v1';

function App() {
  let tokenData = {};
  let  tokenResponse ={};

  const isLoggedIn = () => {
    
    if(window.localStorage.getItem('token')){
      tokenData = {token : window.localStorage.getItem('token')};
      
      checkToken(tokenData).then((response) =>{
        tokenResponse = response.data;
        console.log(tokenResponse);

        return true;
      }).catch(error =>{
        console.error(error);
        return false;
      })

    }else{
      return false;
    }
  }
  const checkToken = (tokenData) => axios.post(REST_API_BASE_URL +'/authentication/check-token', tokenData);


  return (
    <div>
     
      <BrowserRouter>
      
      <HeaderComponent />
      
      <Routes>
        
      <Route index element ={isLoggedIn() ? <Home/> : <Login />}/>
      
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
