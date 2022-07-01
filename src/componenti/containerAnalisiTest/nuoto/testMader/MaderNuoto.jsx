import React, { useState, useEffect } from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"
import BottoniTop from "../../bottoniTop/BottoniTop"
import { useTranslation } from 'react-i18next'

const MaderNuoto = props => {
    const { setPagina, open, setOpen, tipoTest, setTipoTest } = props

    const [puntoCliccato, setPuntoCliccato] = useState({lattato: "", distanza: "", tempo: "", velKmh: "", velMs: "",
        passo100: "", heartrate: "", glicemia: "", o2: "", rpe: "", strokeLength: "", strokeFreq: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [puntiSelected, setPuntiSelected] = useState([])
    const [livAnal, setLivAnal] = useState(2)
    const [lattatoTabTotali, setLattatoTabTotali] = useState({lattato1: "", lattato2: ""})

    useEffect(() => {
        if(modificaRiga) setPuntoCliccato(modificaRiga)
    }, [modificaRiga])

    const { t, i18n } = useTranslation()

    return (
        <div>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaTest={["mader"]} salvaDati={() => alert("sfdddd")} />
            <h2 style={{textAlign: "left"}}>{t("scrivi-framework:nuoto:nuoto")}</h2>

            <ContainerTabelle puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato} modificaRiga={modificaRiga}
            setModificaRiga={setModificaRiga} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            livAnal={livAnal} setLivAnal={setLivAnal} lattatoTabTotali={lattatoTabTotali}
            setLattatoTabTotali={setLattatoTabTotali} />
        </div>
    )
}

export default MaderNuoto