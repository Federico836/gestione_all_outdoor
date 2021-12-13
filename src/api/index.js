import axios from "axios";

const BASE_URL = 'https://api.magneticdays.com/api/';

const axios_instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {'Content-Type': 'application/json', 'token': 'api-magneticdays-2021-planning'},
    
})

/* const getFrameworks = () => {return axios_instance.get('frameworks')}
const postFramework = framework => {return axios_instance.post('frameworks', {dati: JSON.stringify({...framework})}  )}
const deleteFramework = dbid => {return axios_instance.delete('frameworks/' + dbid)}
const updateFramework = framework => {return axios_instance.put('/frameworks/' + framework.dbid,{dati: JSON.stringify({...framework})})}

const listaProp = ["allDay", "backgroundColor", "borderColor", "display", "end", "extendedProps", "mdId", "id", "start",
    "title", "_context", "_def", "_instance"]

const getEvents = () => {return axios_instance.get('events')}
const postEvent = event => {return axios_instance.post('events', {dati: JSON.stringify({...event}, listaProp)}  )}
const deleteEvent = dbid => {return axios_instance.delete('events/' + dbid)}
const updateEvent = event => {return axios_instance.put('/events/' + event.dbid, {dati: JSON.stringify({...event}, listaProp)})} */

const getFrameworks = () => {return axios_instance.get('frameworks')}
const postFramework = framework => {return axios_instance.post('frameworks', {dati: JSON.stringify({...framework}), coach_id: window.md.logged_user.ID})}
const deleteFramework = dbid => {return axios_instance.delete('frameworks/' + dbid)}
const updateFramework = framework => {return axios_instance.put('/frameworks/' + framework.dbid, {dati: JSON.stringify({...framework}), coach_id: window.md.logged_user.ID})}

const listaProp = ["allDay", "backgroundColor", "borderColor", "display", "end", "extendedProps","mdId", "id", "start",
    "title", "_context", "_def", "_instance"]

/* const getEvents = () => {return axios_instance.get('events')}
const postEvent = event => {return axios_instance.post('events', {dati: JSON.stringify({...event}, listaProp), coach_id: window.md.logged_user.ID}  )}
const deleteEvent = dbid => {return axios_instance.delete('events/' + dbid)}
const updateEvent = event => {return axios_instance.put('/events/' + event.dbid, {dati: JSON.stringify({...event}, listaProp), coach_id: window.md.logged_user.ID})} */

const getEvents = user_id => {if(user_id) {return axios_instance.get('events/'+ user_id)} else {return axios_instance.get('events')}}
const postEvent = payload => { const {evento, user_id} = payload; return axios_instance.post('events', {dati: JSON.stringify({...evento}, listaProp), coach_id: window.md.logged_user.ID, user_id})}
const deleteEvent = dbid => {return axios_instance.delete('events/' + dbid)}
const updateEvent = payload => { const {evento, user_id} = payload; console.log({evento, user_id}); return axios_instance.put('/events/' + evento.dbid, {dati: JSON.stringify({...evento}, listaProp), coach_id: window.md.logged_user.ID, user_id})}

const getTemplates = () => {return axios_instance.get('templates')}
const postTemplate = template => {return axios_instance.post('templates', {dati: JSON.stringify({...template}), coach_id: window.md.logged_user.ID})}
const deleteTemplate = dbid => {return axios_instance.delete('templates/' + dbid)}
const updateTemplate = template => {return axios_instance.put('/templates/' + template.dbid, {dati: JSON.stringify({...template}), coach_id: window.md.logged_user.ID})}

export default { getFrameworks, postFramework, deleteFramework, updateFramework,
    getEvents, postEvent, deleteEvent, updateEvent,
    getTemplates, postTemplate, deleteTemplate, updateTemplate
}
