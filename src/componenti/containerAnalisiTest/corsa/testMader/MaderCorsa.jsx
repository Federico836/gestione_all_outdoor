import React, { useState, useEffect } from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"

const MaderCorsa = props => {
    const {  } = props

    const [puntoCliccato, setPuntoCliccato] = useState({lattato: "", distanza: 0, tempo: 0, velKmh: 0, velMs: 0,
        passo1000: "", heartrate: "", glicemia: "", o2: "", rpe: "", strokeLength: "", strokeFreq: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [puntiSelected, setPuntiSelected] = useState([])
    const [livAnal, setLivAnal] = useState(2)
    const [lattatoTabTotali, setLattatoTabTotali] = useState({lattato1: "", lattato2: ""})
    const [note, setNote] = useState("")

    useEffect(() => {
        if(modificaRiga) setPuntoCliccato(modificaRiga)
     }, [modificaRiga])

    return (
        <div>
            <ContainerTabelle />
        </div>
    )
}

export default MaderCorsa