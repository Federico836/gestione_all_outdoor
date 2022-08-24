import logo from './logo.svg'
import './App.css'
import MainContainer from './componenti/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getListaFrameworks } from './redux/actions/FrameworkActions'
import { getListaEventi } from './redux/actions/EventActions'
import { getListaTemplate } from './redux/actions/TemplateActions'
import {useEffect} from 'react'
import i18n from 'i18next'

function App() {

  const dispatch = useDispatch()

  const url_str = window.location.href
  const url = new URL(url_str)
  const search_params = url.searchParams
  const idUtente = search_params.get('id_utente')
  
  const coach_id = (window.md && window.md.logged_user) ? window.md.logged_user.ID : null

  useEffect(() => {
    dispatch(getListaFrameworks(coach_id))
    dispatch(getListaEventi(idUtente))
    dispatch(getListaTemplate(coach_id))
  }, [])

  useEffect(() => {

    let url = new URL(window.location.href);
    let pat = url.pathname.split('/')

    if(pat && pat.length > 2 && pat[1] === 'en') {
      i18n.changeLanguage('en')
    }
    else  {
      i18n.changeLanguage('it')
    }

  },[])

  return (
    <div className="App">
      <MainContainer idUtente={idUtente} />
    </div>
  )
}

export default App
