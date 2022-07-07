import React from "react"
import ContainerMenuSelect from "../../../../menuSelect/ContainerMenuSelect"
import styles from "./ContainerGraficoMenu.module.css"

const ContainerGraficoMenu = props => {
    const { listaTipiTest, tipoTest, setTipoTest } = props

    return (
        <div className={styles.container}>
            <ContainerMenuSelect listaTipiTest={listaTipiTest} tipoTest={tipoTest} setTipoTest={setTipoTest} />
        </div>
    )
}

export default ContainerGraficoMenu
