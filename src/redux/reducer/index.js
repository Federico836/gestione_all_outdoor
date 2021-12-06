import { combineReducers } from 'redux'
import workouts from './WorkoutsReducer'
import frameworks from './FrameworksReducer'
import templates from './TemplateReducer'
import eventi from './EventReducer'
import pdf from './PdfReducer'
import riferimenti from './RiferimentiReducer'

const reducers = {
    workouts,
    frameworks,
    templates,
    eventi,
    pdf,
    riferimenti
};

export default combineReducers(reducers);