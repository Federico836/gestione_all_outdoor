import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'

import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'

import styles from './Report.module.css'

const Report = props => {
    const { listaEventi, rangeDateSelect } = props

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

    const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
        evento.start.getTime()<=rangeDateSelect.end.getTime())

    const lista = useSelector(state => state.frameworks.lista)

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
            <TabCiclismoDragNDrop listaRighe={lista} />
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report
