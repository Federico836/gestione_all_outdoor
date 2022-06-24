import React from "react"
import ContainerTabInserisciRiga from "./containerTabInserisciRiga/ContainerTabInserisciRiga"
import TabCorsaDragNDrop from "./containerTabPuntiSelected/TabCorsaDragNDrop"
import SelezionaPunto from "./selezionaPunto/SelezionaPunto"

const ContainerTabelle = props => {
    const { puntoCliccato, setPuntoCliccato, modificaRiga, setModificaRiga, puntiSelected, setPuntiSelected,
        livAnal, setLivAnal } = props

    return (
        <div>
            <ContainerTabInserisciRiga puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato}
            modificaRiga={modificaRiga} setModificaRiga={setModificaRiga} puntiSelected={puntiSelected}
            setPuntiSelected={setPuntiSelected} />
            <TabCorsaDragNDrop puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            setModificaRiga={setModificaRiga} />
            <SelezionaPunto livAnal={livAnal} setLivAnal={setLivAnal} />
        </div>
    )
}

export default ContainerTabelle