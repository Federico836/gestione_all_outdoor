import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import { calcola7Zone } from '../../../utils/funzioni'

import styles from './Report.module.css'

const Report = props => {
    const { listaEventi, rangeDateSelect, ftp, fc } = props

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

    const listaFramework = useSelector(state => state.frameworks.lista)

    const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() && evento.start.getTime()<=rangeDateSelect.end.getTime())

    const zoneCalcCiclismo = calcola7Zone(ftp, fc)

    const listaWorkouts = []

    for(let c=0;c<eventiSelezionati.length;c++) {
        const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c]._def.sourceId)
        const listaRigheFrame = framework.listaRighe.map(riga => {return {...riga}})
        const listaRigheFrameCalc = listaRigheFrame.map(riga => {
            return {...riga, wattMin: zoneCalcCiclismo[riga.zona-1].watt_min, wattMax: zoneCalcCiclismo[riga.zona-1].watt_max,
                fcMin: zoneCalcCiclismo[riga.zona-1].fc_min, fcMax: zoneCalcCiclismo[riga.zona-1].fc_max}
        })
        listaWorkouts.push({evento: eventiSelezionati[c], listaRighe: listaRigheFrameCalc})
    }

    const stampa = () => {
        const contenuto = paginaDaStampare.current
        const pagina = frameStampa.current.contentWindow
        pagina.document.open()
        pagina.document.write(contenuto.innerHTML)
        pagina.document.close()
        pagina.focus()
        pagina.print()
    }

    return (
        <div ref={paginaDaStampare}>
            <Button variant="contained" onClick={stampa} className={styles.bottoneStampa}>STAMPA</Button>
            <TabCiclismoDragNDrop listaRighe={listaWorkouts[0].listaRighe} />
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report
