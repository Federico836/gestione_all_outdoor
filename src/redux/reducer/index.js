import { combineReducers } from 'redux'
import workouts from './WorkoutsReducer'
import frameworks from './FrameworksReducer'
import pdf from './PdfReducer'
import riferimenti from './RiferimentiReducer'

const reducers = {
    workouts,
    frameworks,
    pdf,
    riferimenti
};

export default combineReducers(reducers);