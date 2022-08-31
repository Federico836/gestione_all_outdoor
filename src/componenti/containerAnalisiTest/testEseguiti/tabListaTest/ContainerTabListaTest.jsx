import React from "react"
import TabListaTest from "./TabListaTest"
import styles from "./ContainerTabListaTest.module.css"

const ContainerTabListaTest = props => {
    const { listaTest } = props

    return (
        <div className={styles.container}>
            <TabListaTest listaTest={listaTest} />
        </div>
    )
}

export default ContainerTabListaTest