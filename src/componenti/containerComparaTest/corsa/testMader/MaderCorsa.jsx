import React from "react"
import ContainerTabelle from "./containerTabelle/ContainerTabelle"

const MaderCorsa = props => {
    const { listaMader, puntiSelectedMader, setPuntiSelectedMader, tipoTest, setTipoTest } = props

    return (
        <div>
            <ContainerTabelle listaMader={listaMader} puntiSelectedMader={puntiSelectedMader}
            setPuntiSelectedMader={setPuntiSelectedMader} tipoTest={tipoTest} setTipoTest={setTipoTest} />
        </div>
    )
}

export default MaderCorsa
