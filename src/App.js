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

  const url_str = window.location.href
  const url = new URL(url_str)
  const search_params = url.searchParams
  const idUtente = search_params.get('id_utente')
  console.log(idUtente)

  useEffect(() => {
    dispatch(getListaFrameworks())
    dispatch(getListaEventi(idUtente))
    dispatch(getListaTemplate())
  }, [])

  return (
    <div className="App">
      <MainContainer idUtente={idUtente} />
    </div>
  )
}

export default App
