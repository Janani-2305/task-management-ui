import axios from 'axios';

const REST_API_BASE_URL = 'http://task-management-api-env.eba-esuuzu4p.ap-south-1.elasticbeanstalk.com/api/v1';


export const getAuthToken = () => {
    return window.localStorage.getItem('token');
    
}

const headers = {headers: {
    'Authorization': 'Bearer ' + getAuthToken()
}};
export const listTasks = () => axios.get(REST_API_BASE_URL +'/tasks?status=Pending', headers);

export const createTask = (task) => axios.post(REST_API_BASE_URL +'/task', task, headers);

export const getTask = (taskId) => axios.get(REST_API_BASE_URL + '/task/' + taskId, headers)

export const updateTask = (task) => axios.put(REST_API_BASE_URL + '/task', task, headers);

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL + '/task/' + taskId, headers);

export const updateStatus = (taskId, task) => axios.patch(REST_API_BASE_URL + '/task/' +taskId, task, headers);



