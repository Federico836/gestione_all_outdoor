import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"

const Report = props => {
    const {  } = props

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

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
            <Button variant="contained" onClick={stampa}>STAMPA</Button>
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report
