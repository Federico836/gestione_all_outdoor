import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import TabCorsaDragNDrop from './tabSport/TabCorsaDragNDrop'
import TabNuotoDragNDrop from './tabSport/TabNuotoDragNDrop'

import { calcola7Zone } from '../../../utils/funzioni'
import { calcolaZoneCorsa } from '../../../utils/funzioni'
import { calcolaZoneNuoto } from '../../../utils/funzioni'

import { calcTempoTotCicl, calcRecTotCicl, calcTempoZoneCicl } from './tabSport/funzioniTotaliCicl'
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
    let tempoTotCiclismo = 0
    let tempoTotCorsa = 0
    let tempoTotNuoto = 0

    let recTotCiclismo = 0
    let recTotCorsa = 0
    let recTotNuoto = 0

    let distanzaTotCorsa = 0
    let distanzaTotNuoto = 0

    const tempoTotCiclismoWeek = []
    const tempoTotCorsaWeek = []
    const tempoTotNuotoWeek = []

    const recTotCiclismoWeek = []
    const recTotCorsaWeek = []
    const recTotNuotoWeek = []

    const distanzaTotCorsaWeek = []
    const distanzaTotNuotoWeek = []

    const tempoZoneCicl = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}
    const tempoZoneCorsa = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0}
    const tempoZoneNuoto = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}

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

            tempoTotCiclismo += calcTempoTotCicl(listaRigheFrameCalc)+calcRecTotCicl(listaRigheFrameCalc)
            recTotCiclismo += calcRecTotCicl(listaRigheFrameCalc)
            const tempoZone = calcTempoZoneCicl(listaRigheFrameCalc)
            tempoZoneCicl.zona1 += tempoZone.zona1
            tempoZoneCicl.zona2 += tempoZone.zona2
            tempoZoneCicl.zona3 += tempoZone.zona3
            tempoZoneCicl.zona4 += tempoZone.zona4
            tempoZoneCicl.zona5 += tempoZone.zona5
            tempoZoneCicl.zona6 += tempoZone.zona6
            tempoZoneCicl.zona7 += tempoZone.zona7
            
            tabDaAggiungere = <TabCiclismoDragNDrop listaRighe={listaRigheFrameCalc} />

            const aggiungiTempoTot = () => tempoTotCiclismoWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: calcTempoTotCicl(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotCiclismoWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: calcRecTotCicl(listaRigheFrameCalc)})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                } else {
                    if(tempoTotCiclismoWeek.length<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                    } else {
                        tempoTotCiclismoWeek[tempoTotCiclismoWeek.length-1].num += calcTempoTotCicl(listaRigheFrameCalc)
                        recTotCiclismoWeek[recTotCiclismoWeek.length-1].num += calcRecTotCicl(listaRigheFrameCalc)
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
            }
        } else if(framework.tipoPerSelect==="corsa") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passoMin: 1000/zoneCalcCorsa[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcCorsa[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcCorsa[riga.zona.zona-1].media}
            })

            tempoTotCorsa += funzioniCorsa.calcTempoTot(listaRigheFrameCalc)+funzioniCorsa.calcRecTot(listaRigheFrameCalc)
            recTotCorsa += funzioniCorsa.calcRecTot(listaRigheFrameCalc)
            distanzaTotCorsa += funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)
            const tempoZone = funzioniCorsa.calcTempoZone(listaRigheFrameCalc)
            tempoZoneCorsa.zona1 += tempoZone.zona1
            tempoZoneCorsa.zona2 += tempoZone.zona2
            tempoZoneCorsa.zona3 += tempoZone.zona3
            tempoZoneCorsa.zona4 += tempoZone.zona4
            tempoZoneCorsa.zona5 += tempoZone.zona5
            tempoZoneCorsa.zona6 += tempoZone.zona6

            tabDaAggiungere = <TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />

            const aggiungiTempoTot = () => tempoTotCorsaWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcTempoTot(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotCorsaWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcRecTot(listaRigheFrameCalc)})
            const aggiungiDistanzaTot = () => distanzaTotCorsaWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                } else {
                    if(tempoTotCorsaWeek.length<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                    } else {
                        tempoTotCorsaWeek[tempoTotCorsaWeek.length-1].num += funzioniCorsa.calcTempoTot(listaRigheFrameCalc)
                        recTotCorsaWeek[recTotCorsaWeek.length-1].num += funzioniCorsa.calcRecTot(listaRigheFrameCalc)
                        distanzaTotCorsaWeek[distanzaTotCorsaWeek.length-1].num += funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
                aggiungiDistanzaTot()
            }

        } else if(framework.tipoPerSelect==="nuoto") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passo: 100/zoneCalcNuoto[riga.zona.zona-1].perce}
            })

            tempoTotNuoto += funzioniNuoto.calcTempoTot(listaRigheFrameCalc)+funzioniNuoto.calcRecTot(listaRigheFrameCalc)
            recTotNuoto += funzioniNuoto.calcRecTot(listaRigheFrameCalc)
            distanzaTotNuoto += funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)
            const tempoZone = funzioniNuoto.calcTempoZone(listaRigheFrameCalc)
            tempoZoneNuoto.zona1 += tempoZone.zona1
            tempoZoneNuoto.zona2 += tempoZone.zona2
            tempoZoneNuoto.zona3 += tempoZone.zona3
            tempoZoneNuoto.zona4 += tempoZone.zona4
            tempoZoneNuoto.zona5 += tempoZone.zona5
            tempoZoneNuoto.zona6 += tempoZone.zona6
            tempoZoneNuoto.zona7 += tempoZone.zona7
            tempoZoneNuoto.zona8 += tempoZone.zona8

            tabDaAggiungere = <TabNuotoDragNDrop listaRighe={listaRigheFrameCalc} />

            const aggiungiTempoTot = () => tempoTotNuotoWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcTempoTot(listaRigheFrameCalc)})
            const aggiungiRecTot = () => recTotNuotoWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcRecTot(listaRigheFrameCalc)})
            const aggiungiDistanzaTot = () => distanzaTotNuotoWeek.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)/10})
            if(c>0) {
                if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                } else {
                    if(tempoTotNuotoWeek.lengh<1) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                    } else {
                        if(tempoTotNuotoWeek.lengh>0) {
                            tempoTotNuotoWeek[tempoTotNuotoWeek.length-1].num += funzioniNuoto.calcTempoTot(listaRigheFrameCalc)
                            recTotNuotoWeek[recTotNuotoWeek.length-1].num += funzioniNuoto.calcRecTot(listaRigheFrameCalc)
                            distanzaTotNuotoWeek[distanzaTotNuotoWeek.length-1].num += funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)/10
                        }
                    }
                }
            } else {
                aggiungiTempoTot()
                aggiungiRecTot()
                aggiungiDistanzaTot()
            }
        }

        if(c>0) {
            if(eventiSelezionati[c-1].start.getDay()!==eventiSelezionati[c].start.getDay()) {
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

    console.log({tempoTotCiclismoWeek, recTotCiclismoWeek})

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
                    <h3>{t('scrivi-framework:ciclismo:ciclismo')}</h3>
                    <ZoneCiclismo7 zoneCalcCiclismo={zoneCalcCiclismo} />
                    <h3>{t('scrivi-framework:corsa:corsa')}</h3>
                    <ZoneCorsa zoneCalcCorsa={zoneCalcCorsa} />
                    <h3>{t('scrivi-framework:nuoto:nuoto')}</h3>
                    <ZoneNuoto zoneCalcNuoto={zoneCalcNuoto} />
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