import React from "react"
import ContainerTabInserisciRiga from "./containerTabInserisciRiga/ContainerTabInserisciRiga"
import TabCorsaDragNDrop from "./containerTabPuntiSelected/TabCorsaDragNDrop"

const ContainerTabelle = props => {
    const { puntoCliccato, setPuntoCliccato, modificaRiga, setModificaRiga, puntiSelected, setPuntiSelected } = props

    return (
        <div>
            <ContainerTabInserisciRiga puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato}
            modificaRiga={modificaRiga} setModificaRiga={setModificaRiga} puntiSelected={puntiSelected}
            setPuntiSelected={setPuntiSelected} />
            <TabCorsaDragNDrop puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            setModificaRiga={setModificaRiga} />
        </div>
    )
}

export default ContainerTabelle