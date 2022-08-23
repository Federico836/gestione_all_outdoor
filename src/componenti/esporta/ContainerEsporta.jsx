import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabListaTemplate from './tabelle/TabListaTemplate'
import TabValori from './tabelle/TabValori'
import Report from './tabelle/Report'
import BtnCaricaFile from './btnCaricaFile/BtnCaricaFile'
import IgnoraData from './IgnoraData/IgnoraData'
import { useTranslation } from 'react-i18next'
import { addEvento, eliminaEvento } from '../../redux/actions/EventActions'
import { addSoglia } from '../../redux/actions/SogliaActions'
import { v4 as uuidv4 } from 'uuid'

import { Button, Checkbox } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina, utente, idUtente, ruoloLoggedUser } = props

    const dispatch = useDispatch()

    const [listaEventi, setListaEventi] = useState(useSelector(state => state.eventi.lista))
    const [rangeDateSelect, setRangeDateSelect] = useState({start: new Date(), end: new Date()})
    const [ftp, setFtp] = useState("")
    const [fc, setFc] = useState("")
    const [passoCorsa, setPassoCorsa] = useState(0)
    const [passoNuoto, setPassoNuoto] = useState(0)
    const [report, setReport] = useState(false)
    const [tabellone, setTabellone] = useState(true)
    const [tipoEventi, setTipoEventi] = useState("framework")
    const [calendarApi, setCalendarApi] = useState(null)

    const { t, i18n } = useTranslation()

    /* const listaEventiStore = useSelector(state => state.eventi.lista)
    console.log(listaEventiStore)

    useEffect(function()  {
        setListaEventi(listaEventiStore)
    }, [listaEventiStore]) */

    const sogliaUtente = useSelector(state => state.soglia.soglia)
    useEffect(function() {
        if(utente && sogliaUtente.hasOwnProperty("ftp")) {
            console.log(sogliaUtente.passonuoto)
            setFtp(sogliaUtente.ftp)
            setFc(sogliaUtente.fc)
            setPassoCorsa(sogliaUtente.passocorsa)
            setPassoNuoto(sogliaUtente.passonuoto)
        }
    }, [sogliaUtente])

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

    const eventiSelezionati = listaEventi ? listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
    evento.start.getTime() < rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime()) : []
    const listaFramework = useSelector(state => state.frameworks.lista)

    const controlloEventiSelected = () => {
        const frameworkSelezionati = []
        eventiSelezionati.forEach(evento => {
            const trovato = listaFramework.find(framework => framework.id==evento.extendedProps.mdId)
            if(trovato) frameworkSelezionati.push(trovato)
        })

        const cicl = frameworkSelezionati.find(framework => framework.tipoPerSelect==="ciclismo")
        const corsa = frameworkSelezionati.find(framework => framework.tipoPerSelect==="corsa")
        const nuoto = frameworkSelezionati.find(framework => framework.tipoPerSelect==="nuoto")

        function datiPresenti() {
            const ciclTrovato = cicl!=undefined ? true : false
            const corsaTrovato = corsa!=undefined ? true : false
            const nuotoTrovato = nuoto!=undefined ? true : false

            let datiMancanti = ""
            if(ciclTrovato) {
                if(ftp=="" || fc=="") datiMancanti+=" "+t('scrivi-framework:ciclismo:ciclismo')
            }
            if(corsaTrovato) {
                if(!passoCorsa) datiMancanti+=" "+t('scrivi-framework:corsa:corsa')
            }
            if(nuotoTrovato) {
                if(!passoNuoto) datiMancanti+=" "+t('scrivi-framework:nuoto:nuoto')
            }

            return datiMancanti
        }
        
        const datiMancanti = datiPresenti()
        if(datiMancanti=="") {
            setReport(true)
        } else {
            alert(t('esporta:inserisci-dati')+":"+datiMancanti)
        }
    }

    const salvaDatiCalcoli = () => {
        dispatch(addSoglia({ftp: ftp, fc: fc, passocorsa: passoCorsa, passonuoto: passoNuoto}, idUtente))
    }

    setTimeout(() => console.log(eventiSelezionati), 1000)

    const eliminaEventiSelected = () => {
        const eventiSelected = calendarApi.getEvents().filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
        evento.start.getTime() < rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime())
        eventiSelected.forEach(evento => {
            dispatch(eliminaEvento(listaEventi.find(eventoStore => eventoStore.id==evento.id).dbid, idUtente))
            evento.remove()
        })
    }

    return (
        <div className={styles.container}>
            {report ? 
            <Report rangeDateSelect={rangeDateSelect} ftp={ftp} fc={fc} passoCorsa={passoCorsa}
            passoNuoto={passoNuoto} report={report} setReport={setReport} tabellone={tabellone} utente={utente}
            eventiSelezionati={eventiSelezionati} /> :
            <>
                {ruoloLoggedUser==="allenatore" ?
                <div className={styles.containerBottoniTop}>
                    <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                    {utente ? <BtnCaricaFile testo={"PDF"} /> : null}
                    {!utente ? <Button variant="contained" onClick={eliminaEventiSelected}>{t('esporta:pulisci')}</Button> : null}
                    {utente ? <IgnoraData testo={"FIT"} /> : null}
                    {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
                </div> : <div style={{marginTop: "3vh"}}></div>}

                <div className={ruoloLoggedUser==="allenatore" ? styles.containerGrid : null}>
                    <div>
                        <Calendario listaEventi={listaEventi ? listaEventi : []} setRangeDateSelect={setRangeDateSelect} setCalendarApi={setCalendarApi}
                        idUtente={idUtente} getEventPropsFromCalendarEvent={getEventPropsFromCalendarEvent} ruoloLoggedUser={ruoloLoggedUser} />
                    </div>
                    {ruoloLoggedUser==="allenatore" ? 
                    <div style={{position: "relative"}}>
                        {tipoEventi==="framework" ? <TabListaFramework setTipoEventi={setTipoEventi} /> :
                        <TabListaTemplate setTipoEventi={setTipoEventi} rangeDateSelect={rangeDateSelect}
                        listaEventi={listaEventi ? listaEventi : []} aggiungiTemplateCal={aggiungiTemplateCal} />}
                    </div> : null}
                </div>

                {utente ?
                <>
                    <div className={ruoloLoggedUser!=="allenatore" ? styles.tabValori : null}>
                        <TabValori ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} passoNuoto={passoNuoto} setPassoNuoto={setPassoNuoto}
                        passoCorsa={passoCorsa} setPassoCorsa={setPassoCorsa} ruoloLoggedUser={ruoloLoggedUser} />

                        <div className={styles.containerBottoniBottom}>
                            <Button variant="contained" onClick={controlloEventiSelected}
                            disabled={rangeDateSelect.end-rangeDateSelect.start<100 ? true : false}>REPORT</Button>

                            {ruoloLoggedUser==="allenatore" ? 
                            <Button variant="contained" onClick={salvaDatiCalcoli} style={{marginLeft: "1vw"}}>{t('esporta:salva')}</Button> : null}

                            <Checkbox onChange={() => setTabellone(!tabellone)} checked={tabellone} />

                            <div>{t('main-container:tabella-zone')}</div>
                        </div>
                    </div>
                </> : null}
            </>}
        </div>
    )
}

export default ContainerEsporta

