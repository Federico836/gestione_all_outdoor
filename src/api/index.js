import axios from "axios";

const BASE_URL = 'https://api.magneticdays.com/api/';

const axios_instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {'Content-Type': 'application/json', 'token': 'api-magneticdays-2021-planning'},
    
})

const getMDFrameworks = () => {return axios.get('https://www.magneticdays.com/api/md/get_elenco_scheletri/?auth_cookie=' + window.md.cookie)}

const getFrameworks = (coach_id) => {if(coach_id) {return axios_instance.get('frameworks/' + coach_id) } else {return axios_instance.get('frameworks')}}
const postFramework = framework => {return axios_instance.post('frameworks', {dati: JSON.stringify({...framework}), coach_id: window.md.logged_user.ID})}
const deleteFramework = dbid => {return axios_instance.delete('frameworks/' + dbid)}
const updateFramework = framework => {return axios_instance.put('/frameworks/' + framework.dbid, {dati: JSON.stringify({...framework}), coach_id: window.md.logged_user.ID})}

const listaProp = ["allDay", "backgroundColor", "borderColor", "display", "end", "extendedProps","mdId", "id", "start",
    "title", "_context", "_def", "_instance"]

const getEvents = (user_id) => {if(user_id) {return axios_instance.get('events/'+ user_id)} else {return axios_instance.get('coachevents/' + window.md.logged_user.ID)}}
const postEvent = payload => { const {evento, user_id} = payload; return axios_instance.post('events', {dati: JSON.stringify({...evento}, listaProp), coach_id: window.md.logged_user.ID, user_id})}
const deleteEvent = dbid => {return axios_instance.delete('events/' + dbid)}
const updateEvent = payload => { const {evento, user_id} = payload; return axios_instance.put('/events/' + evento.dbid, {dati: JSON.stringify({...evento}, listaProp), coach_id: window.md.logged_user.ID, user_id})}

const getTemplates = (coach_id) => {if(coach_id) { return axios_instance.get('templates/' + coach_id) } else {return axios_instance.get('templates')}}
const postTemplate = template => {return axios_instance.post('templates', {dati: JSON.stringify({...template}), coach_id: window.md.logged_user.ID})}
const deleteTemplate = dbid => {return axios_instance.delete('templates/' + dbid)}
const updateTemplate = template => {return axios_instance.put('/templates/' + template.dbid, {dati: JSON.stringify({...template}), coach_id: window.md.logged_user.ID})}

const getSoglia = user_id => {return axios_instance.get('valori/soglia/'+ user_id)}
const postSoglia = payload => {const {soglia, user_id} = payload; return axios_instance.post('soglia', {...soglia, coach_id: window.md.logged_user.ID, user_id})}
const deleteSoglia = dbid => {return axios_instance.delete('soglia/' + dbid)}
const updateSoglia = payload => {const {soglia, user_id} = payload; return axios_instance.put('/soglia/' + soglia.dbid, {...soglia, coach_id: window.md.logged_user.ID, user_id})}

const getTests = user_id => {if(user_id) {return axios_instance.get('tests/'+ user_id)} else {return axios_instance.get('tests')}}
const postTest = payload => { const {test, user_id} = payload; return axios_instance.post('tests', {dati: JSON.stringify({...test}), coach_id: window.md.logged_user.ID, user_id})}
const deleteTest = dbid => {return axios_instance.delete('tests/' + dbid)}
const updateTest = payload => { const {test, user_id, testId} = payload; return axios_instance.put('/tests/' + testId, {dati: JSON.stringify({...test}), coach_id: window.md.logged_user.ID, user_id})}



export default { getFrameworks, postFramework, deleteFramework, updateFramework,
    getEvents, postEvent, deleteEvent, updateEvent,
    getTemplates, postTemplate, deleteTemplate, updateTemplate,
    getSoglia, postSoglia, deleteSoglia, updateSoglia, getTests, postTest, deleteTest, updateTest,getMDFrameworks
}
