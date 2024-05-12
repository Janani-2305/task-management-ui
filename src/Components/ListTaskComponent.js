import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTask, listTasks, taskStatus, updateStatus} from '../services/TaskService';
import { textAlign } from '@mui/system';
import './ListTaskComponent.css';

const ListTaskComponent = () => {
    const navigator = useNavigate();
   
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getAllTask();
    }, [])
    function getAllTask(){
        listTasks().then((response) => {
            setTasks(response.data);
           console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewTask(){
        navigator('/add-task')

    }
    function updateTask(id){
        navigator(`/edit-task/${id}`)
    }
    function removeTask(id){
        console.log(id);

        deleteTask(id).then((response) => {
            getAllTask();

        }).catch(error => {
            console.error(error);
        })
    }
    function handleCheckboxChange(id, isChecked) {
        console.log(isChecked);
        let task = {}
        

        if(isChecked){
             task= {completed:'true',status:'Completed'}
        }else{
             task= {completed:'false',status:'Pending'}
        }
        console.log(task);
        updateStatus(id, task)
            .then((response) => {
                // Update the task list after successful API call
                getAllTask();
            })
            .catch((error) => {
                console.error(error);
            });
    }


  return (
    <div className='container'>
        <h2 className='text'>Task Details</h2>

        <button className='btn btn-primary mb-2' onClick={addNewTask}>Add Task</button>
        
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Task Id</th>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Priority</th>
                    <th>Target Date</th>
                    <th>Mark as Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task => 
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.priority}</td>
                            <td>{task.targetDate}</td>                           
                            <td>
                            <input
                                    type='checkbox'
                                    id={`checkbox-${task.id}`}
                                    name={`checkbox-${task.id}`}
                                    className='centered-checkbox'
                                    style={{ verticalAlign: 'middle' }}
                                    onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                                />
                            </td>
                            
                            <td>
                                <button className='btn btn-info' onClick={()=> updateTask(task.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=> removeTask(task.id)}>Delete</button>

                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListTaskComponent