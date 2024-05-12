import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../Components/Home.css';
import LineChart from './LineChart';
import Tasks from './ListTaskComponent';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigator = useNavigate();
    function addNewTask(){
        navigator('/add-task')
    
    }
  const [tasks, setTasks] = useState([]);


  return (
    <Tabs defaultActiveKey="longer-tab" id="justify-tab-example" className="mb-3" justify>
      <Tab eventKey="profile" title="Overview">
        <div>
          Overview
        </div>
      </Tab>

      <Tab eventKey="longer-tab" title="My Task">
        <div className="my-task-container"  style={{textAlign:'center'}}>
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p><strong>No tasks available</strong></p>
              <button type='button' className='btn btn-primary' onClick={addNewTask}>Click here to add task</button>
            </div>
          ) : (
            <Tasks tasks={tasks} />
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

export default Home;
