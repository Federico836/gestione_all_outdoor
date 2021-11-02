import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import TabCorsaDragNDrop from './tabSport/TabCorsaDragNDrop'
import TabNuotoDragNDrop from './tabSport/TabNuotoDragNDrop'

import { calcola7Zone } from '../../../utils/funzioni'
import { calcolaZoneCorsa } from '../../../utils/funzioni'
import { calcolaZoneNuoto } from '../../../utils/funzioni'

import { calcTempoTotCicl, calcRecTotCicl, calcTempoZoneCicl } from './tabSport/funzioniTotaliCicl'
import * as funzioniCorsa from './tabSport/funzioniTotaliCorsa'
import * as funzioniNuoto from './tabSport/funzioniTotaliNuoto'

import styles from './Report.module.css'

const Report = props => {
    const { listaEventi, rangeDateSelect, ftp, fc, passoCorsa, passoNuoto, report, setReport } = props

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

    const listaFramework = useSelector(state => state.frameworks.lista)

    const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
    evento.start.getTime()<=rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime())

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

    const tempoZoneCicl = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}
    const tempoZoneCorsa = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0}
    const tempoZoneNuoto = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}

    for(let c=0;c<eventiSelezionati.length;c++) {
        const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c]._def.sourceId)
        const listaRigheFrame = framework.listaRighe.map(riga => {return {...riga}})
        if(c>0) {
            if(eventiSelezionati[c-1].start.getDay()!==eventiSelezionati[c].start.getDay()) {
                listaStampaWorkouts.push(<h3>{eventiSelezionati[c].start.toISOString()}</h3>)
            } else {
                listaStampaWorkouts.push(<div style={{marginTop: "3vh"}}></div>)
            }
        } else {
            listaStampaWorkouts.push(<h3>{eventiSelezionati[c].start.toISOString()}</h3>)
        }

        let listaRigheFrameCalc = []
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
            listaStampaWorkouts.push(<TabCiclismoDragNDrop listaRighe={listaRigheFrameCalc} />)

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
            listaStampaWorkouts.push(<TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />)

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
            listaStampaWorkouts.push(<TabNuotoDragNDrop listaRighe={listaRigheFrameCalc} />)
        }

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
          </style>`+contenuto.innerHTML)
        pagina.document.close()
        pagina.focus()
        pagina.print()
        console.log(contenuto)
    }

    return (
        <div>
            <div className={styles.containerBottoni}>
                <Button variant="contained" onClick={() => setReport(!report)}>INDIETRO</Button>
                <Button variant="contained" onClick={stampa}>STAMPA</Button>
            </div>
            
            <div ref={paginaDaStampare}>
                {listaStampaWorkouts}
            </div>
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report
