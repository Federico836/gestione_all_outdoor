import React from "react"
import ContainerTabInserisciRiga from "./containerTabInserisciRiga/ContainerTabInserisciRiga"

const ContainerTabelle = props => {
    const { puntoCliccato, setPuntoCliccato } = props

    return (
        <div>
            <ContainerTabInserisciRiga puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato} />
        </div>
    )
}

export default ContainerTabelle