import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { createTask, getTask, updateTask, taskStatus } from '../services/TaskService'
import './TaskComponent.css';


const TaskComponent = () => {


    //const[id, setId] = useState('')
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[priority, setPriority] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const {id} = useParams();
    
    const [errors, setErrors] = useState({
        //id:'',
        name:'',
        description:'',
        priority:'',
        completed:'false',
        status:'Pending',
        
        
    })
    
    useEffect(() =>{
        if(id){
            getTask(id).then((response)=>{
                setName(response.data.name);
                setDescription(response.data.description);
                setPriority(response.data.priority);
                
                
            }).catch(error => {
                console.error(error);
            })
        }

    },[id])
    

   const navigator = useNavigate();
   
    function saveOrUpdateTask(e){
        e.preventDefault();

    
        if(validateForm()){

            if(id){
                const task = {name, description, priority, targetDate}
                updateTask(task).then((response) =>{
                    console.log(response.data);
                    navigator('/home');
                }).catch(error =>{
                    console.error(error);
                })
                
            }else{
                const task = {name, description, priority, targetDate, completed:'false',status:'Pending'}
                createTask(task).then((response)=>{
                    console.log(response.data);
                    navigator('/home');
                }).catch(error =>{
                    console.error(error);
                })
            }
        } 
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}
        /*if(id.trim()){
            errorsCopy.id = '';
        }else{
            errorsCopy.id = 'id is required';
            valid = false;
        }*/
        if(name.trim()){
            errorsCopy.title = '';
        }else{
            errorsCopy.title = 'Task Title is required';
            valid=false;
        }
        if(description.trim()){
            errorsCopy.description = '';
        }else{
            errorsCopy.description = 'Task Description is required';
            valid=false;
        }
        /*if(priority.trim()){
            errorsCopy.priority = '';
        }else{
            errorsCopy.priority = 'Task Priority is required';
            valid=false;
        }*/

        if(targetDate.trim()){
            errorsCopy.targetDate = '';
        }else{
            errorsCopy.targetDate = 'Target date is required';
            valid=false;
        }
        setErrors(errorsCopy);
        return valid;

    }

    function pageTitle(){
        if(id){
            return  <h2 className='text-center'>Update Task</h2>
        }else{
            return  <h2 className='text-center'>Add Task</h2>
        }
    }


  return (
    <div className='container-sm'>
        <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
               
                <div className='card-body'>
                    <form>
                       
                        <div className='form-group mb-2'>
                            <label className='form-label'>Task Title:</label>
                            <input type='text' placeholder='Enter Task Title'
                            name='name'
                            value={name} className={`form-control ${errors.title ? 'is-invalid': ''}`}
                             onChange={  (e) => setName(e.target.value)}>

                             </input>
                             {errors.title && <div className='invalid-feedback'> {errors.title}</div>}

                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Task Description:</label>
                            <input type='text' placeholder='Enter Task Description'
                            name='description'
                            value={description} className={`form-control ${errors.description ? 'is-invalid': ''}`} 
                            onChange={(e) => setDescription(e.target.value)}>

                            </input>
                            {errors.description && <div className='invalid-feedback'> {errors.description}</div>}
                        </div>

                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>Priority:</label>
                            <input type='text' placeholder='Enter Task Priority'
                            name='priority'
                            value={priority} className={`form-control ${errors.priority ? 'is-invalid': ''}`} 
                            onChange={(e) => setPriority(e.target.value)}>

                            </input>
                            {errors.priority && <div className='invalid-feedback'> {errors.priority}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Target  Date:</label>
                            <input type='date' placeholder='Enter Target Date'
                            name='targetDate'
                            value={targetDate} className={`form-control ${errors.targetDate ? 'is-invalid': ''}`}
                             onChange={(e) => setTargetDate(e.target.value)}>
                            </input>
                            {errors.targetDate && <div className='invalid-feedback'> {errors.targetDate}</div>}
                        </div>
            <button className='btn btn-success' onClick={saveOrUpdateTask}>Submit</button>

                    </form>

                </div>

            </div>

        </div>
    </div>
  )
}

export default TaskComponent