import React from "react"
import ContainerTabInserisciRiga from "./containerTabInserisciRiga/ContainerTabInserisciRiga"
import TabCorsaDragNDrop from "./containerTabPuntiSelected/TabCorsaDragNDrop"
import SelezionaPunto from "./selezionaPunto/SelezionaPunto"
import ContainerTabTotali from "./containerTabTotali/ContainerTabTotali"
import GraficoLattato from "./graficoLattato/GraficoLattato"

const ContainerTabelle = props => {
    const { puntoCliccato, setPuntoCliccato, modificaRiga, setModificaRiga, puntiSelected, setPuntiSelected,
        livAnal, setLivAnal, lattatoTabTotali, setLattatoTabTotali, tabTotali } = props

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
            <GraficoLattato puntiSelected={puntiSelected} lattatoTabTotali={lattatoTabTotali} tabTotali={tabTotali} />
        </div>
    )
}

export default ContainerTabelle