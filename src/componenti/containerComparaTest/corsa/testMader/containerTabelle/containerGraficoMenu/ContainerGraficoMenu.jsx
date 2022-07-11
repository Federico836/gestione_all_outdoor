import React from "react"
import ContainerMenuSelect from "../../../../menuSelect/ContainerMenuSelect"
import GraficoLattatoVel from "./GraficoLattatoVel"
import styles from "./ContainerGraficoMenu.module.css"

const ContainerGraficoMenu = props => {
    const { tipoTest, setTipoTest, listaPunti, puntiSelectedMader, setPuntiSelectedMader } = props

    return (
        <div className={styles.container}>
            <GraficoLattatoVel puntiSelectedMader={puntiSelectedMader} />
            <ContainerMenuSelect listaTipiTest={["mader"]} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaPunti={listaPunti} puntiSelected={puntiSelectedMader} setPuntiSelected={setPuntiSelectedMader} />
        </div>
    )
}

export default ContainerGraficoMenu
