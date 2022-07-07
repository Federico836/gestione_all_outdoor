import React from "react"
import ContainerMenuSelect from "../../../../menuSelect/ContainerMenuSelect"
import styles from "./ContainerGraficoMenu.module.css"

const ContainerGraficoMenu = props => {
    const { listaTipiTest, tipoTest, setTipoTest, listaPunti, puntiSelectedMader, setPuntiSelectedMader } = props

    return (
        <div className={styles.container}>
            <ContainerMenuSelect listaTipiTest={listaTipiTest} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaPunti={listaPunti} puntiSelected={puntiSelectedMader} setPuntiSelected={setPuntiSelectedMader} />
        </div>
    )
}

export default ContainerGraficoMenu
