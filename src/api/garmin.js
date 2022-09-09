import qs from 'qs'
import { create } from 'apisauce'

const api_workouts = create({
  baseURL: 'https://www.magneticdays.com/',
  headers: {
    'Accept'      : 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 30000
})



const upload = (user_id,workout) => {return api_workouts.post('/garmin/endpoints/training.php',qs.stringify({user_id,workout: JSON.stringify(workout)}))}

export default {upload}