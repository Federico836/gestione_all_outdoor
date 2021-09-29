
import configureStore from './CreateStore';
import rootReducer from '../reducer';
//import rootSaga from '../sagas'

//export default configureStore(rootReducer, rootSaga);
export default configureStore(rootReducer, null);