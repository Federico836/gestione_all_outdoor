import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import TabCorsaDragNDrop from './tabSport/TabCorsaDragNDrop'
import TabNuotoDragNDrop from './tabSport/TabNuotoDragNDrop'
import TabPalestraDragNDrop from './tabSport/TabPalestraDragNDrop'
import TabCombinatiTriDragNDrop from './tabSport/TabCombinatiTriDragNDrop'
import TabSportDragNDrop from './tabSport/TabSportDragNDrop'

import { calcola7Zone } from '../../../utils/funzioni'
import { calcolaZoneCorsa } from '../../../utils/funzioni'
import { calcolaZoneNuoto } from '../../../utils/funzioni'

import * as funzioniCicl from './tabSport/funzioniTotaliCicl'
import * as funzioniCorsa from './tabSport/funzioniTotaliCorsa'
import * as funzioniNuoto from './tabSport/funzioniTotaliNuoto'

import ZoneCiclismo7 from './tabZone/ZoneCiclismo7'
import ZoneCorsa from './tabZone/ZoneCorsa'
import ZoneNuoto from './tabZone/ZoneNuoto'

import styles from './Report.module.css'

const Report = props => {
    const { listaEventi, rangeDateSelect, ftp, fc, passoCorsa, passoNuoto, report, setReport, tabellone } = props

    const { t, i18n } = useTranslation()

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

    const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
    evento.start.getTime() < rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime())

    const listaFramework = useSelector(state => state.frameworks.lista)

    const zoneCalcCiclismo = calcola7Zone(ftp, fc)
    const zoneCalcCorsa = calcolaZoneCorsa(1000/passoCorsa)
    const zoneCalcNuoto = calcolaZoneNuoto(100/passoNuoto)

    const listaStampaWorkouts = []
    let tempoTotCicl = []
    let tempoTotCorsa = []
    let tempoTotNuoto = []

    let recTotCicl = []
    let recTotCorsa = []
    let recTotNuoto = []

    let distTotCorsa = []
    let distTotNuoto = []

    const tempoZoneCicl = []
    const tempoZoneCorsa = []
    const tempoZoneNuoto = []

    for(let c=0;c<eventiSelezionati.length;c++) {
        //const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c]._def.sourceId)

        const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c].extendedProps.mdId)
        if(!framework) continue;
        
        const listaRigheFrame = framework.listaRighe.map(riga => {return {...riga}})
        
        let listaRigheFrameCalc = []
        let tabDaAggiungere = []
        if(framework.tipoPerSelect==="ciclismo") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, wattMin: zoneCalcCiclismo[riga.zona-1].watt_min, wattMax: zoneCalcCiclismo[riga.zona-1].watt_max,
                    fcMin: zoneCalcCiclismo[riga.zona-1].fc_min, fcMax: zoneCalcCiclismo[riga.zona-1].fc_max}
            })

            tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
            tabDaAggiungere.push(<TabCiclismoDragNDrop listaRighe={listaRigheFrameCalc} />)

            const aggiungiTempoTot = () => tempoTotCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.calcTempoTot(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.calcRecTot(listaRigheFrameCalc)})

            const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}}
            const tempoZone = funzioniCicl.calcTempoZone(listaRigheFrameCalc)
            const aggiungiTempoZone = () => tempoZoneCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.sommaZone(addOggettoZone(), tempoZone)})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiTempoZone()
                } else {
                    if(tempoTotCicl.length<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiTempoZone()
                    } else {
                        tempoTotCicl[tempoTotCicl.length-1].num += funzioniCicl.calcTempoTot(listaRigheFrameCalc)
                        recTotCicl[recTotCicl.length-1].num += funzioniCicl.calcRecTot(listaRigheFrameCalc)
                        funzioniCicl.sommaZone(tempoZoneCicl[tempoZoneCicl.length-1].num, tempoZone)
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
                aggiungiTempoZone()
            }
        } else if(framework.tipoPerSelect==="corsa") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passoMin: 1000/zoneCalcCorsa[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcCorsa[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcCorsa[riga.zona.zona-1].media}
            })

            tabDaAggiungere.push(<h4>{t('scrivi-framework:corsa:corsa')}</h4>)
            tabDaAggiungere.push(<TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />)

            const aggiungiTempoTot = () => tempoTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcTempoTot(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcRecTot(listaRigheFrameCalc)})
            const aggiungiDistanzaTot = () => distTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)})

            const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0}}
            const tempoZone = funzioniCorsa.calcTempoZone(listaRigheFrameCalc)
            const aggiungiTempoZone = () => tempoZoneCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.sommaZone(addOggettoZone(), tempoZone)})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                    aggiungiTempoZone()
                } else {
                    if(tempoTotCorsa.length<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                        aggiungiTempoZone()
                    } else {
                        tempoTotCorsa[tempoTotCorsa.length-1].num += funzioniCorsa.calcTempoTot(listaRigheFrameCalc)
                        recTotCorsa[recTotCorsa.length-1].num += funzioniCorsa.calcRecTot(listaRigheFrameCalc)
                        distTotCorsa[distTotCorsa.length-1].num += funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)
                        funzioniCorsa.sommaZone(tempoZoneCorsa[tempoZoneCorsa.length-1].num, tempoZone)
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
                aggiungiDistanzaTot()
                aggiungiTempoZone()
            }

        } else if(framework.tipoPerSelect==="nuoto") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passo: 100/zoneCalcNuoto[riga.zona.zona-1].perce}
            })

            tabDaAggiungere.push(<h4>{t('scrivi-framework:nuoto:nuoto')}</h4>)
            tabDaAggiungere.push(<TabNuotoDragNDrop listaRighe={listaRigheFrameCalc} />)

            const aggiungiTempoTot = () => tempoTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcTempoTot(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcRecTot(listaRigheFrameCalc)})
            const aggiungiDistanzaTot = () => distTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)})

            const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}}
            const tempoZone = funzioniNuoto.calcTempoZone(listaRigheFrameCalc)
            const aggiungiTempoZone = () => tempoZoneNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.sommaZone(addOggettoZone(), tempoZone)})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                    aggiungiTempoZone()
                } else {
                    if(tempoTotNuoto.lengh<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                        aggiungiTempoZone()
                    } else {
                        if(tempoTotNuoto.lengh>0) {
                            tempoTotNuoto[tempoTotNuoto.length-1].num += funzioniNuoto.calcTempoTot(listaRigheFrameCalc)
                            recTotNuoto[recTotNuoto.length-1].num += funzioniNuoto.calcRecTot(listaRigheFrameCalc)
                            distTotNuoto[distTotNuoto.length-1].num += funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)
                            funzioniNuoto.sommaZone(tempoZoneNuoto[tempoZoneNuoto.length-1].num, tempoZone)
                        }
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
                aggiungiDistanzaTot()
                aggiungiTempoZone()
            }
        } else if(framework.tipoPerSelect==="palestra") {
            tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
            tabDaAggiungere.push(<TabPalestraDragNDrop listaRighe={listaRigheFrame} />)
        } else if(framework.tipoPerSelect==="combinati_tri") {
            tabDaAggiungere.push(<h4>{t('scrivi-framework:palestra:palestra')}</h4>)
            tabDaAggiungere.push(<TabCombinatiTriDragNDrop listaRighe={listaRigheFrame} />)
        } else if(framework.tipoPerSelect==="altri") {
            tabDaAggiungere.push(<h4>{t('scrivi-framework:sport:altri')}</h4>)
            tabDaAggiungere.push(<TabSportDragNDrop listaRighe={listaRigheFrame} />)
        }

        if(c>0) {
            if(eventiSelezionati[c-1].start.getDay()!==eventiSelezionati[c].start.getDay()
            || eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                    <h3>{eventiSelezionati[c].start.toISOString()}</h3>
                    {tabDaAggiungere}
                </div>)
            } else {
                listaStampaWorkouts.push(<div style={{marginTop: "3vh"}}>
                    {tabDaAggiungere}
                </div>)
            }
        } else {
            listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                <h3>{eventiSelezionati[c].start.toISOString()}</h3>
                {tabDaAggiungere}
            </div>)
        }

    }

    const densitaCicl = []
    const tempoTotCiclConRec = []
    const wltCicl = []
    for(let c=0;c<tempoTotCicl.length;c++) {
        densitaCicl.push(recTotCicl[c]/tempoTotCicl[c]*100)
        tempoTotCiclConRec.push(tempoTotCicl[c]+recTotCicl[c])
        wltCicl.push()
    }

    const velMediaCorsa = []
    const passoMedioCorsa = []
    const densitaCorsa = []
    const tempoTotCorsaConRec = []
    const wltCorsa = []
    const wlsCorsa = []
    for(let c=0;c<tempoTotCorsa.length;c++) {
        const velMedia = distTotCorsa[c].num/tempoTotCorsa[c].num
        velMediaCorsa.push(velMedia)
        passoMedioCorsa.push(1000/velMedia)
        densitaCorsa.push(recTotCorsa[c]/tempoTotCorsa[c]*100)
        tempoTotCorsaConRec.push(tempoTotCorsa[c]+recTotCorsa[c])
        wltCorsa.push(passoCorsa/passoMedioCorsa[passoMedioCorsa.length-1])
        wlsCorsa.push(Math.pow(wltCorsa[wltCorsa.length-1], 3)*tempoTotCorsa[c].num/3600*100)
    }

    const velMediaNuoto = []
    const passoMedioNuoto = []
    const densitaNuoto = []
    const tempoTotNuotoConRec = []
    const wltNuoto = []
    const wlsNuoto = []
    for(let c=0;c<tempoTotNuoto.length;c++) {
        const velMedia = distTotNuoto[c].num/tempoTotNuoto[c].num
        velMediaNuoto.push(velMedia)
        passoMedioNuoto.push(100/velMedia)
        densitaNuoto.push(recTotNuoto/tempoTotNuoto*100)
        tempoTotNuotoConRec.push(tempoTotNuoto[c]+recTotNuoto[c])
        wltNuoto.push(passoNuoto/passoMedioNuoto[passoMedioNuoto.length-1])
        wlsNuoto.push(Math.pow(wltNuoto[wltNuoto.length-1], 3)*tempoTotNuoto[c].num/3600*100)
    }
    
    const stampa = () => {
        const contenuto = paginaDaStampare.current
        const pagina = frameStampa.current.contentWindow
        pagina.document.open()
        pagina.document.write(`<style>
            @media print {
                @page {
                    margin: 1cm;
                }
                /* body {
                    margin: 1.6cm;
                } */
            }

            .containerTab {
                display: flex;
            }
            
            .containerTab div span {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .inputRinomina {
                display: block;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
                width: 90%;
                border: 0px;
                outline: none;
            }
            
            .inputRinomina:focus {
                border: 0px;
            }

            .zone-ciclismo7 table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .zone-ciclismo7 table tr td {
                border: 1px solid black;
                text-align: center;
                font-size: 11px;
                padding: 2px;
            }

          </style>`+contenuto.innerHTML)
        pagina.document.close()
        pagina.focus()
        pagina.print()
    }

    return (
        <div>
            <div className={styles.containerBottoni}>
                <Button variant="contained" onClick={() => setReport(!report)}>{t('esporta:report:indietro')}</Button>
                <Button variant="contained" onClick={stampa}>{t('esporta:report:stampa')}</Button>
            </div>
            
            <div ref={paginaDaStampare}>
                {listaStampaWorkouts}
                {tabellone ? 
                <>
                    <div style={{pageBreakAfter: "always"}}></div>
                    {fc!==0 && ftp!==0  ? <div>
                        <h3>{t('scrivi-framework:ciclismo:ciclismo')}</h3>
                        <ZoneCiclismo7 zoneCalcCiclismo={zoneCalcCiclismo} />
                    </div> : null}
                    {passoCorsa!==0 ? <div>
                        <h3>{t('scrivi-framework:corsa:corsa')}</h3>
                        <ZoneCorsa zoneCalcCorsa={zoneCalcCorsa} />
                    </div> : null}
                    {passoNuoto!==0 ? <div>
                        <h3>{t('scrivi-framework:nuoto:nuoto')}</h3>
                        <ZoneNuoto zoneCalcNuoto={zoneCalcNuoto} />
                    </div> : null}
                </> : null}
            </div>
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

