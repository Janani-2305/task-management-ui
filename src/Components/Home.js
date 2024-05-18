import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../Components/Home.css';
import LineChart from './LineChart';
import Tasks from './ListTaskComponent';
import '../Components/Home.css';

function Home() {
  
  return (
    
    <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify 
    >
    <Tab eventKey="profile" title="Overview">
      <div>
        <LineChart/>
      </div>
    </Tab>
  
    <Tab eventKey="longer-tab" title="My Task">  
      <div>
        <Tasks/>
      </div>
    </Tab>
  </Tabs>
  

    
  );
}

export default Home;