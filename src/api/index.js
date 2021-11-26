import axios from "axios";

const BASE_URL = 'https://api.magneticdays.com/api/';

const axios_instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {'Content-Type': 'application/json', 'token': 'api-magneticdays-2021-planning'},
    
});

const getFrameworks = () => {return axios_instance.get('frameworks')}
const postFramework = framework => {return axios_instance.post('frameworks', {dati: JSON.stringify({...framework})}  )}
const deleteFramework = dbid => {return axios_instance.delete('frameworks/' + dbid)}
const updateFramework = framework => {return axios_instance.put('/frameworks/' + framework.dbid,{dati: JSON.stringify({...framework})})}


const getEvents = () => {return axios_instance.get('events')}
const postEvent = event => {return axios_instance.post('events', {dati: JSON.stringify({...event},
    ["allDay", "backgroundColor", "borderColor", "display", "end", "extendedProps","mdId", "id", "start", "title", "_context", "_def", "_instance"])}  )}
const deleteEvent = dbid => {return axios_instance.delete('events/' + dbid)}
const updateEvent = event => {return axios_instance.put('/events/' + event.dbid,{dati: JSON.stringify({...event})})}


export default {
    getFrameworks,
    postFramework,
    deleteFramework,
    updateFramework,
    getEvents,
    postEvent,
    deleteEvent,
    updateEvent,
}
