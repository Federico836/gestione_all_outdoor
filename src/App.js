import logo from './logo.svg'
import './App.css'
import MainContainer from './componenti/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getListaFrameworks } from './redux/actions/FrameworkActions'
import { getListaEventi } from './redux/actions/EventActions'
import { getListaTemplate } from './redux/actions/TemplateActions'
import {useEffect} from 'react'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListaFrameworks())
    dispatch(getListaEventi())
    dispatch(getListaTemplate())
  }, [])

  return (
    <div className="App">
      <MainContainer />
    </div>
  );
}

export default App;
