import React from "react"
import ContainerGraficoMenu from "./containerGraficoMenu/ContainerGraficoMenu"

const ContainerTabelle = props => {
    const { listaTest, puntiSelectedMader, setPuntiSelectedMader, tipoTest, setTipoTest } = props

    return (
        <div>
            <ContainerGraficoMenu listaTipiTest={["mader"]} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaPunti={listaTest} puntiSelectedMader={puntiSelectedMader} setPuntiSelectedMader={setPuntiSelectedMader} />
        </div>
    )
}

export default ContainerTabelle