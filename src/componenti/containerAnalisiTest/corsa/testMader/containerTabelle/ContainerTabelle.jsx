import React from "react"
import ContainerTabInserisciRiga from "./containerTabInserisciRiga/ContainerTabInserisciRiga"
import TabCorsaDragNDrop from "./containerTabPuntiSelected/TabCorsaDragNDrop"
import SelezionaPunto from "./selezionaPunto/SelezionaPunto"
import ContainerTabTotali from "./containerTabTotali/ContainerTabTotali"
import calcTabTotali from "../../../../../utils/funzioniAnalisiTest/corsa/funzioniMader"

const ContainerTabelle = props => {
    const { puntoCliccato, setPuntoCliccato, modificaRiga, setModificaRiga, puntiSelected, setPuntiSelected,
        livAnal, setLivAnal, lattatoTabTotali, setLattatoTabTotali } = props

    const tabTotali = calcTabTotali(puntiSelected, lattatoTabTotali, livAnal)

    console.log(tabTotali)

    return (
        <div>
            <ContainerTabInserisciRiga puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato}
            modificaRiga={modificaRiga} setModificaRiga={setModificaRiga} puntiSelected={puntiSelected}
            setPuntiSelected={setPuntiSelected} />
            <TabCorsaDragNDrop puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            setModificaRiga={setModificaRiga} />
            <ContainerTabTotali lattatoTabTotali={lattatoTabTotali} setLattatoTabTotali={setLattatoTabTotali}
            tabTotali={tabTotali} />
            <SelezionaPunto livAnal={livAnal} setLivAnal={setLivAnal} />
        </div>
    )
}

export default ContainerTabelle