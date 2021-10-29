import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import TabCorsaDragNDrop from './tabSport/TabCorsaDragNDrop'

import { calcola7Zone } from '../../../utils/funzioni'
import { calcolaZoneCorsa } from '../../../utils/funzioni'
import { calcolaZoneNuoto } from '../../../utils/funzioni'

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

            listaStampaWorkouts.push(<TabCiclismoDragNDrop listaRighe={listaRigheFrameCalc} />)

        } else if(framework.tipoPerSelect==="corsa") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passoMin: 1000/zoneCalcCorsa[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcCorsa[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcCorsa[riga.zona.zona-1].media}
            })

            listaStampaWorkouts.push(<TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />)

        } else if(framework.tipoPerSelect==="nuoto") {
            listaRigheFrameCalc = listaRigheFrame.map(riga => {
                return {...riga, passo: 100/zoneCalcNuoto[riga.zona.zona-1].perce}
            })
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
