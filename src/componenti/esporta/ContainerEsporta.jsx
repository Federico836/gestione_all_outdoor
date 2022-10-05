import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabListaTemplate from './tabelle/TabListaTemplate'
import TabListaFrameworksMD from './tabelle/TabListaFrameworksMd'
import TabListaWorkoutsMD from './tabelle/TabListaWorkoutsMd'
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
import SelectTipoEventi from './SelectTipoEventi'
import MuiAlert from '@mui/material/Alert';

import * as GraficoWeek from './tabelle/grafici/settimana/GraficoWeek'
import * as GraficoTot from './tabelle/grafici/totali/GraficoTot'

import elaboraCiclismo from '../../utils/funzioniCiclismo'
import elaboraCorsa from '../../utils/funzioniCorsa'
import elaboraNuoto from '../../utils/funzioniNuoto'
//import TabDatiWeek from './tabDatiWeek/TabDatiWeek'
import TabDatiWeek from './tabelle/tabDatiWeek/TabDatiWeek'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

    const getEventiPerGrafici = (eventiSelezionati,listaFramework,ftp,fc,passoCorsa,passoNuoto) => {

        const getWeeks = (arr, criteria = "settimana") => {

            const newObj = arr.map(el => { return {settimana: el.start.getWeek()}}).reduce(function (acc, currentValue) {
                if (!acc[currentValue[criteria]]) {
                  acc[currentValue[criteria]] = [];
                }
                acc[currentValue[criteria]].push(currentValue);
                return acc;
              }, {});
        
             return Object.keys(newObj)
        }

        const weeks = getWeeks(eventiSelezionati)

        const ciclismo = elaboraCiclismo(listaFramework, eventiSelezionati, ftp, fc)
        const corsa = elaboraCorsa(listaFramework, eventiSelezionati, passoCorsa)
        const nuoto = elaboraNuoto(listaFramework, eventiSelezionati, passoNuoto)        
       
        const eventi = weeks.map(w => {

            const c = ciclismo.eventiCiclismoGrouped.find(el => el.settimana === w)
            const cor = corsa.eventiCorsaGrouped.find(el => el.settimana === w)
            const n = nuoto.eventiNuotoGrouped.find(el => el.settimana === w)

            return {settimana: w, ciclismo: c, corsa: cor, nuoto: n}
        })


        return {eventi,ciclismo,corsa,nuoto}
    }



    const { t, i18n } = useTranslation()

    const listaEventiStore = useSelector(state => state.eventi.lista)
    //console.log(listaEventiStore)

    const handleCloseAlertUpload = () => {

        dispatch({type: 'RESET_UPLOADED_FRAMEWORKS', payload: {}})
        dispatch({type: 'RESET_UPLOADED_FIT', payload: {}})
    }


    useEffect(function()  {
        setListaEventi(listaEventiStore)
    }, [listaEventiStore])

    const sogliaUtente = useSelector(state => state.soglia.soglia)
    useEffect(function() {
        if(utente && sogliaUtente.hasOwnProperty("ftp")) {
            //console.log(sogliaUtente.passonuoto)
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
    const listaFrameworksMD = useSelector(state => state.mdFrameworks.lista)

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

    const estraiFitDaEventiSelezionati = (eventiSelezionati,listaFramework) => {

        const fitEvents = eventiSelezionati.filter(ev => ev.extendedProps.mdType === "FIT").map(el => {

            const id = el.extendedProps.mdId
            const framework = listaFrameworksMD.find(el => el.id === id)

            return {data: el.start, id: el.extendedProps.mdId, framework}
        })

        return fitEvents

    }

    const handleClickOnButtonFitExport = () => {

       

        eventiSelezionati.forEach((ev,index) => { 
        
        
            const frame = (ev.extendedProps.mdType === 'FIT') 
            ? listaFrameworksMD.find(el => el.id === ev.extendedProps.mdId)
            : listaFramework.find(el => el.id === ev.extendedProps.mdId)
            
            
            if(!frame) return
    
             if(ev.extendedProps.mdType === 'FIT') {
                setTimeout(() => {
                    //console.log({FIT: frame})
                    dispatch({type: 'UPLOAD_FIT_TO_GARMIN', payload: {framework: frame,user_id: idUtente,date: new Date(ev.start).toISOString(),ftp,hr: fc}})
                },250 + 100*index) 
             }
             else {
                setTimeout(() => {
                    //console.log({WKT: frame})
                    dispatch({type: 'UPLOAD_FRAMEWORK_TO_GARMIN', payload: {framework: frame,user_id: idUtente,date: new Date(ev.start).toISOString()}})
                },250 + 150*index)
             }
    
    
        })







        //dispatch({type: 'UPLOAD_TO_GARMIN', payload: {events: eventiSelezionati,user_id: idUtente}})
        //console.log(estraiFitDaEventiSelezionati(eventiSelezionati))
    }

    const dati_per_grafici = getEventiPerGrafici(eventiSelezionati,listaFramework,ftp,fc,passoCorsa,passoNuoto)
    const eventi = dati_per_grafici.eventi
    const nuoto = dati_per_grafici.nuoto
    const ciclismo = dati_per_grafici.ciclismo
    const corsa = dati_per_grafici.corsa

    const tabGraficiWeek = [<div className="containerGrafico">
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CiclTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CorsaTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.NuotoTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CiclTrimp eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CorsaTrimp eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.NuotoTrimp eventi={eventi} /></div>
        </div>]
        tabGraficiWeek.push(<div className="containerGrafico">
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="cicl" /></div>
            
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="corsa" /></div>
            
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="nuoto" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="cicl" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="corsa" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="nuoto" /></div>
        </div>)
        const tabGraficiTot = <div className="containerGrafico">
                <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TOT").toUpperCase()}
                </span><GraficoTot.CiclTempoZone tempoZone={dati_per_grafici.ciclismo.totaliCiclismo.tempoZone} /></div>
                
                <div><span>{(t('scrivi-framework:corsa:corsa')+" TOT").toUpperCase()}
                </span><GraficoTot.CorsaTempoZone tempoZone={dati_per_grafici.corsa.totaliCorsa.tempoZone} /></div>
                
                <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TOT").toUpperCase()}
                </span><GraficoTot.NuotoTempoZone tempoZone={dati_per_grafici.nuoto.totaliNuoto.tempoZone} /></div>
                
                <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TRIMP TOT").toUpperCase()}
                </span><GraficoTot.CiclTrimp totali={dati_per_grafici.ciclismo.totaliCiclismo} /></div>
                
                <div><span>{(t('scrivi-framework:corsa:corsa')+" TRIMP TOT").toUpperCase()}
                </span><GraficoTot.CorsaTrimp totali={dati_per_grafici.corsa.totaliCorsa} /></div>
                
                <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TRIMP TOT").toUpperCase()}
                </span><GraficoTot.NuotoTrimp totali={dati_per_grafici.nuoto.totaliNuoto} /></div>
            </div>

    let listaTabDatiWeek = eventi.map((ev,index) => {

        const week = ev

        return (<div style={{display: "grid", gridColumnGap: "5vw",
        gridTemplateColumns: "auto auto", alignContent: "center", marginTop: "8vh", pageBreakBefore: "always"}}>
           { week.ciclismo || week.corsa || week.nuoto ? <TabDatiWeek settimana={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)}
            // ciclismo
            wltCicl={(week.ciclismo) ? week.ciclismo.wltWorkoutTot: null} 
            wlsCicl={(week.ciclismo) ? week.ciclismo.wlsWorkoutTot: null}
            tempoTotCicl={(week.ciclismo) ? week.ciclismo.tempoTot: null} 
            recTotCicl={(week.ciclismo) ? week.ciclismo.recTot: null} 
            tempoTotCiclConRec={(week.ciclismo) ? week.ciclismo.tempoTotCiclConRec: null}
            densitaCicl={(week.ciclismo) ? week.ciclismo.densitaCicl: null} 
            tempoZoneCicl={(week.ciclismo) ? week.ciclismo.tempoZone: null} 
            trimpCiclAerobic={(week.ciclismo) ? week.ciclismo.trimpCiclAerobic: null}
            trimpCiclMixed={(week.ciclismo) ? week.ciclismo.trimpCiclMixed: null} 
            trimpCiclAnaerobic={(week.ciclismo) ? week.ciclismo.trimpCiclAnaerobic: null}
            trimpCiclTotal={(week.ciclismo) ? week.ciclismo.trimpCiclTotal: null} 
            trimpCiclMin={(week.ciclismo) ? week.ciclismo.trimpCiclMin: null} 
            // corsa
            tempoTotCorsa={(week.corsa) ? week.corsa.tempoTot : null}
            recTotCorsa={(week.corsa) ? week.corsa.recTot : null}
            distTotCorsa={(week.corsa) ? week.corsa.distTot : null}
            tempoZoneCorsa={(week.corsa) ? week.corsa.tempoZone : null}
            velMedia={(week.corsa) ? week.corsa.velMedia : null}
            passoMedioCorsa={(week.corsa) ? week.corsa.passoMedioCorsa : null}
            densitaCorsa={(week.corsa) ? week.corsa.densitaCorsa : null}
            tempoTotCorsaConRec={(week.corsa) ? week.corsa.tempoTotCorsaConRec : null} 
            wltCorsa={(week.corsa) ? week.corsa.wltCorsa : null}
            wlsCorsa={(week.corsa) ? week.corsa.wlsCorsa : null}
            trimpCorsaAerobic={(week.corsa) ? week.corsa.trimpCorsaAerobic : null}
            trimpCorsaMixed={(week.corsa) ? week.corsa.trimpCorsaMixed : null}
            trimpCorsaAnaerobic={(week.corsa) ? week.corsa.trimpCorsaAnaerobic : null} 
            trimpCorsaTotal={(week.corsa) ? week.corsa.trimpCorsaTotal : null}
            trimpCorsaMin={(week.corsa) ? week.corsa.trimpCorsaMin : null}   

            // nuoto
            tempoTotNuoto={(week.nuoto) ? week.nuoto.tempoTot : null}
            recTotNuoto={(week.nuoto) ? week.nuoto.recTot : null}
            distTotNuoto={(week.nuoto) ? week.nuoto.distTot : null}
            tempoZoneNuoto={(week.nuoto) ? week.nuoto.tempoZone : null}
            velMediaNuoto={(week.nuoto) ? week.nuoto.velMedia : null}
            passoMedioNuoto={(week.nuoto) ? week.nuoto.passoMedioNuoto : null}
            densitaNuoto={(week.nuoto) ? week.nuoto.densitaNuoto : null}
            tempoTotNuotoConRec={(week.nuoto) ? week.nuoto.tempoTotNuotoConRec : null} 
            wltNuoto={(week.nuoto) ? week.nuoto.wltNuoto : null}
            wlsNuoto={(week.nuoto) ? week.nuoto.wlsNuoto : null}
            trimpNuotoAerobic={(week.nuoto) ? week.nuoto.trimpNuotoAerobic : null}
            trimpNuotoMixed={(week.nuoto) ? week.nuoto.trimpNuotoMixed : null}
            trimpNuotoAnaerobic={(week.nuoto) ? week.nuoto.trimpNuotoAnaerobic : null} 
            trimpNuotoTotal={(week.nuoto) ? week.nuoto.trimpNuotoTotal : null}
            trimpNuotoMin={(week.nuoto) ? week.nuoto.trimpNuotoMin : null} /> : null}
        </div>)

    })

    const tabellaTotali = <div className="tab-totali"><TabDatiWeek settimana={t('esporta:report:tab-dati-week:totale-delle-settimane')}
        // ciclismo
        wltCicl={ciclismo.totaliCiclismo.wltWorkoutTot} wlsCicl={ciclismo.totaliCiclismo.wlsWorkoutTot}
        tempoTotCicl={ciclismo.totaliCiclismo.tempoTot} recTotCicl={ciclismo.totaliCiclismo.recTot} tempoTotCiclConRec={ciclismo.totaliCiclismo.tempoTotCiclConRec}
        densitaCicl={ciclismo.totaliCiclismo.densitaCicl} tempoZoneCicl={ciclismo.totaliCiclismo.tempoZone} trimpCiclAerobic={ciclismo.totaliCiclismo.trimpCiclAerobic}
        trimpCiclMixed={ciclismo.totaliCiclismo.trimpCiclMixed} trimpCiclAnaerobic={ciclismo.totaliCiclismo.trimpCiclAnaerobic}
        trimpCiclTotal={ciclismo.totaliCiclismo.trimpCiclTotal} trimpCiclMin={ciclismo.totaliCiclismo.trimpCiclMin} 

        // corsa
        tempoTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoTot : null}
        recTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.recTot : null}
        distTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.distTot : null}
        tempoZoneCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoZone : null}
        velMedia={(corsa.totaliCorsa) ? corsa.totaliCorsa.velMedia : null}
        passoMedioCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.passoMedioCorsa : null}
        densitaCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.densitaCorsa : null}
        tempoTotCorsaConRec={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoTotCorsaConRec : null} 
        wltCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.wltCorsa : null}
        wlsCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.wlsCorsa : null}
        trimpCorsaAerobic={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaAerobic : null}
        trimpCorsaMixed={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaMixed : null}
        trimpCorsaAnaerobic={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaAnaerobic : null} 
        trimpCorsaTotal={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaTotal : null}
        trimpCorsaMin={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaMin : null} 

        //nuoto
        tempoTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoTot : null}
        recTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.recTot : null}
        distTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.distTot : null}
        tempoZoneNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoZone : null}
        velMediaNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.velMedia : null}
        passoMedioNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.passoMedioNuoto : null}
        densitaNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.densitaNuoto : null}
        tempoTotNuotoConRec={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoTotNuotoConRec : null} 
        wltNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.wltNuoto : null}
        wlsNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.wlsNuoto : null}
        trimpNuotoAerobic={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoAerobic : null}
        trimpNuotoMixed={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoMixed : null}
        trimpNuotoAnaerobic={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoAnaerobic : null} 
        trimpNuotoTotal={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoTotal : null}
        trimpNuotoMin={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoMin : null} /></div>

    return (
        <div className={styles.container}>
            {report ? 
            <Report rangeDateSelect={rangeDateSelect} ftp={ftp} fc={fc} passoCorsa={passoCorsa}
            passoNuoto={passoNuoto} report={report} setReport={setReport} tabellone={tabellone} utente={utente}
            eventiSelezionati={eventiSelezionati} /> :
            <>
                {ruoloLoggedUser==="allenatore" ?
                <div className={styles.containerBottoniTop}>
                    {/* <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button> */}
                    {utente ? <BtnCaricaFile testo={"PDF"} /> : null}
                    {!utente ? <Button variant="contained" onClick={eliminaEventiSelected}>{t('esporta:pulisci')}</Button> : null}
                    {utente ? <IgnoraData testo={"FIT"} handleClickOnButtonFitExport={handleClickOnButtonFitExport}/> : null}
                    {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
                </div> : <div style={{marginTop: "3vh"}}></div>}

                <div className={ruoloLoggedUser==="allenatore" ? styles.containerGrid : null}>
                    <div>
                        <Calendario listaEventi={listaEventi ? listaEventi : []} setRangeDateSelect={setRangeDateSelect} setCalendarApi={setCalendarApi}
                        idUtente={idUtente} getEventPropsFromCalendarEvent={getEventPropsFromCalendarEvent} ruoloLoggedUser={ruoloLoggedUser} />
                    </div>
                    {ruoloLoggedUser==="allenatore" ? 
                    <div style={{position: "relative"}}>
                    {(listaFramework.filter(el => el.uploaded).length > 0 || listaFrameworksMD.filter(el => el.uploaded).length > 0) && 
                        <Alert severity="success" sx={{ width: '100%' }} onClose={handleCloseAlertUpload}>
                            Uploaded # {listaFramework.filter(el => el.uploaded).length + listaFrameworksMD.filter(el => el.uploaded).length} FIT
                        </Alert>}
                       
                        <SelectTipoEventi tipoEventi={tipoEventi} setTipoEventi={setTipoEventi}/>
                        {tipoEventi==="framework" && <TabListaFramework idUtente={idUtente} setTipoEventi={setTipoEventi} />}
                        {tipoEventi === "fit" && <TabListaFrameworksMD idUtente={idUtente} setTipoEventi={setTipoEventi} ftp={ftp} hr={fc} />}
                        {tipoEventi === "workouts" && <TabListaWorkoutsMD idUtente={idUtente} setTipoEventi={setTipoEventi} />}
                        {tipoEventi === "template" && <TabListaTemplate setTipoEventi={setTipoEventi} rangeDateSelect={rangeDateSelect}
                        listaEventi={listaEventi ? listaEventi : []} aggiungiTemplateCal={aggiungiTemplateCal} />}


                        {/* {tipoEventi==="framework" ? <TabListaFramework setTipoEventi={setTipoEventi} /> : (tipoEventi === "fit") ? <TabListaFrameworksMD setTipoEventi={setTipoEventi} /> :
                        <TabListaTemplate setTipoEventi={setTipoEventi} rangeDateSelect={rangeDateSelect}
                        listaEventi={listaEventi ? listaEventi : []} aggiungiTemplateCal={aggiungiTemplateCal} />} */}
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
                {utente && tabGraficiWeek}
                {utente && listaTabDatiWeek}
                {utente && tabGraficiTot}
                {utente && tabellaTotali}
                {utente && <div style={{marginTop: '20px'}}></div>}
            </>}
        </div>
    )
}

export default ContainerEsporta

