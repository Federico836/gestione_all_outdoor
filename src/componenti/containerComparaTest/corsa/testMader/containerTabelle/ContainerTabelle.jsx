import React from "react"
import ContainerGraficoMenu from "./containerGraficoMenu/ContainerGraficoMenu"
import styles from "./ContainerTabelle.module.css"

const ContainerTabelle = props => {
    const { listaTest, puntiSelectedMader, setPuntiSelectedMader, tipoTest, setTipoTest } = props

    return (
        <div className={styles.container}>
            <ContainerGraficoMenu tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaPunti={listaTest} puntiSelectedMader={puntiSelectedMader} setPuntiSelectedMader={setPuntiSelectedMader} />
        </div>
    )
}

export default ContainerTabelle