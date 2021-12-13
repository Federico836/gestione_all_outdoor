import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabListaTemplate from './tabelle/TabListaTemplate'
import TabValori from './tabelle/TabValori'
import Report from './tabelle/Report'
import BtnCaricaFile from './btnCaricaFile/BtnCaricaFile'
import { useTranslation } from 'react-i18next'
import { addEvento } from '../../redux/actions/EventActions'
import { v4 as uuidv4 } from 'uuid'

import { Button, Checkbox } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina, utente, idUtente } = props

    const dispatch = useDispatch()

    const [listaEventi, setListaEventi] = useState(useSelector(state => state.eventi.lista))
    const [rangeDateSelect, setRangeDateSelect] = useState([])
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [passoCorsa, setPassoCorsa] = useState(0)
    const [passoNuoto, setPassoNuoto] = useState(0)
    const [report, setReport] = useState(false)
    const [tabellone, setTabellone] = useState(true)
    const [tipoEventi, setTipoEventi] = useState("framework")
    const [calendarApi, setCalendarApi] = useState(null)

    const { t, i18n } = useTranslation()

    const listaEventiStore = useSelector(state => state.eventi.lista)
    console.log(listaEventiStore)

    useEffect(() => {
        setListaEventi(listaEventiStore)
    }, [listaEventiStore])

    const getEventPropsFromCalendarEvent = calEvent => {
        return {
                ...calEvent,
                extendedProps: calEvent.extendedProps,
                allDay: calEvent.allDay, 
                backgroundColor: calEvent.backgroundColor,
                borderColor: calEvent.borderColor,
                display: calEvent.display,
                id: calEvent.id,
                title: calEvent.title,
                start: (calEvent.start) ? new Date(calEvent.start.getTime()) : null,
                end: (calEvent.end) ? new Date(calEvent.end.getTime()) : null
        }
    }

    const aggiungiTemplateCal = template => {
        const listaEventiCopia = JSON.parse(JSON.stringify(template.listaEventi))
        listaEventiCopia.forEach(evento => {
            evento.start = new Date(rangeDateSelect.start.getTime()+evento.start)
            evento.end = evento.end ? new Date(rangeDateSelect.start.getTime()+evento.end) : null
            evento.id = uuidv4()
            delete evento.dbid
            calendarApi.addEvent(evento)
            dispatch(addEvento(getEventPropsFromCalendarEvent(evento), idUtente))
        })
        /* setListaEventi([...listaEventi].concat(listaEventiCopia)) */
    }

    return (
        <div className={styles.container}>
            {report ? 
            <Report listaEventi={listaEventi /* calendarApi.getEvents() */} rangeDateSelect={rangeDateSelect} ftp={ftp} fc={fc} passoCorsa={passoCorsa}
            passoNuoto={passoNuoto} report={report} setReport={setReport} tabellone={tabellone} utente={utente} /> :
            <>
                <div className={styles.containerBottoniTop}>
                    <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                    {utente ? <BtnCaricaFile /> : null}
                </div>

                <div className={styles.containerGrid}>
                    <div>
                        <Calendario listaEventi={listaEventi} setRangeDateSelect={setRangeDateSelect} setCalendarApi={setCalendarApi}
                        idUtente={idUtente} getEventPropsFromCalendarEvent={getEventPropsFromCalendarEvent} />
                    </div>
                    <div style={{position: "relative"}}>
                        {tipoEventi==="framework" ? <TabListaFramework setTipoEventi={setTipoEventi} /> :
                        <TabListaTemplate setTipoEventi={setTipoEventi} rangeDateSelect={rangeDateSelect}
                        listaEventi={listaEventi} aggiungiTemplateCal={aggiungiTemplateCal} />}
                    </div>
                </div>

                {utente ?
                <>
                    <TabValori ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} passoNuoto={passoNuoto} setPassoNuoto={setPassoNuoto}
                    passoCorsa={passoCorsa} setPassoCorsa={setPassoCorsa} />

                    <div className={styles.containerBottoniBottom}>
                        <Button variant="contained" onClick={() => setReport(true)}
                        disabled={rangeDateSelect.length<1 ? true : false}>REPORT</Button>
                        <Checkbox onChange={() => setTabellone(!tabellone)} checked={tabellone} />
                        <div>{t('main-container:tabella-zone')}</div>
                    </div>
                </> : null}
            </>}
        </div>
    )
}

export default ContainerEsporta
