import React, { useState, useEffect } from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"
import BottoniTop from "../../bottoniTop/BottoniTop"
import calcTabTotali from "../../../../utils/funzioniAnalisiTest/corsa/funzioniMader"
import { useTranslation } from 'react-i18next'

const MaderCorsa = props => {
    const { setPagina, open, setOpen, tipoTest, setTipoTest } = props

    const [puntoCliccato, setPuntoCliccato] = useState({lattato: "", distanza: "", tempo: "", velKmh: "", velMs: "",
        passo1000: "", heartrate: "", glicemia: "", o2: "", rpe: "", strokeLength: "", strokeFreq: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [puntiSelected, setPuntiSelected] = useState([])
    const [livAnal, setLivAnal] = useState(2)
    const [lattatoTabTotali, setLattatoTabTotali] = useState({lattato1: "", lattato2: ""})

    useEffect(() => {
        if(modificaRiga) setPuntoCliccato(modificaRiga)
    }, [modificaRiga])

    const { t, i18n } = useTranslation()

    const tabTotali = calcTabTotali(puntiSelected, lattatoTabTotali, livAnal)

    function salvaDati() {
        const dati = {
            data: Date.now(),
            tipoSport: "corsa",
            tipoTest: "mader",
            tabTotali: {...tabTotali, lattato1: lattatoTabTotali.lattato1, lattato2: lattatoTabTotali.lattato2},
            puntiSelected
        }

        console.log(dati)
    }

    return (
        <div>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaTest={["mader"]} salvaDati={salvaDati} />
            <h2 style={{textAlign: "left"}}>{t("scrivi-framework:corsa:corsa")}</h2>

            <ContainerTabelle puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato} modificaRiga={modificaRiga}
            setModificaRiga={setModificaRiga} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            livAnal={livAnal} setLivAnal={setLivAnal} lattatoTabTotali={lattatoTabTotali}
            setLattatoTabTotali={setLattatoTabTotali} tabTotali={tabTotali} />
        </div>
    )
}

export default MaderCorsa