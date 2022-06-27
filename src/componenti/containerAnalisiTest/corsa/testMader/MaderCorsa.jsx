import React, { useState, useEffect } from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"

const MaderCorsa = props => {
    const {  } = props

    const [puntoCliccato, setPuntoCliccato] = useState({lattato: "", distanza: "", tempo: "", velKmh: "", velMs: "",
        passo1000: "", heartrate: "", glicemia: "", o2: "", rpe: "", strokeLength: "", strokeFreq: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [puntiSelected, setPuntiSelected] = useState([])
    const [livAnal, setLivAnal] = useState(2)
    const [lattatoTabTotali, setLattatoTabTotali] = useState({lattato1: "", lattato2: ""})

    useEffect(() => {
        if(modificaRiga) setPuntoCliccato(modificaRiga)
    }, [modificaRiga])

    console.log(puntiSelected)

    return (
        <div>
            <ContainerTabelle puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato} modificaRiga={modificaRiga}
            setModificaRiga={setModificaRiga} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            livAnal={livAnal} setLivAnal={setLivAnal} lattatoTabTotali={lattatoTabTotali}
            setLattatoTabTotali={setLattatoTabTotali} />
        </div>
    )
}

export default MaderCorsa