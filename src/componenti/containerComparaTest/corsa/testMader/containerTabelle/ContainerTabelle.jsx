import React from "react"
import ContainerGraficoMenu from "./containerGraficoMenu/ContainerGraficoMenu"

const ContainerTabelle = props => {
    const { listaMader, puntiSelectedMader, setPuntiSelectedMader, tipoTest, setTipoTest } = props

    return (
        <div>
            <ContainerGraficoMenu listaTipiTest={["mader"]} tipoTest={tipoTest} setTipoTest={setTipoTest} />
        </div>
    )
}

export default ContainerTabelle