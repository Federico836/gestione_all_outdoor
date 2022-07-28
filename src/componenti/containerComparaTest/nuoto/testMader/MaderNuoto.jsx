import React from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"

const MaderCorsa = props => {
    const { listaTest, puntiSelectedMader, setPuntiSelectedMader, tipoTest, setTipoTest } = props

    return (
        <div>
            <ContainerTabelle listaTest={listaTest} puntiSelectedMader={puntiSelectedMader}
            setPuntiSelectedMader={setPuntiSelectedMader} tipoTest={tipoTest} setTipoTest={setTipoTest} />
        </div>
    )
}

export default MaderCorsa
