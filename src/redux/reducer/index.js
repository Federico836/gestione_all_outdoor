import { combineReducers } from 'redux'
import workouts from './WorkoutsReducer'
import frameworks from './FrameworksReducer'
import templates from './TemplateReducer'
import eventi from './EventReducer'
import pdf from './PdfReducer'
import riferimenti from './RiferimentiReducer'
import soglia from './SogliaReducer'
import mdFrameworks from './MDFrameworksReducer'

const reducers = {
    workouts,
    frameworks,
    templates,
    eventi,
    pdf,
    riferimenti,
    soglia,
    mdFrameworks

}

export default combineReducers(reducers)