import React from "react"
import BottoniTop from "./bottoniTop/BottoniTop"
import styles from "./ContainerAnalisiTest.module.css"

const ContainerAnalisiTest = props => {
    const { setPagina } = props

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} />
        </div>
    )
}

export default ContainerAnalisiTest