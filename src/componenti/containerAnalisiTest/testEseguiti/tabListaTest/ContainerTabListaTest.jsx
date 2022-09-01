import React from "react"
import TabListaTest from "./TabListaTest"
import styles from "./ContainerTabListaTest.module.css"

const ContainerTabListaTest = props => {
    const { listaTest, setListaTest, setTestEseguiti } = props

    return (
        <div className={styles.container}>
            <TabListaTest listaTest={listaTest} setListaTest={setListaTest} setTestEseguiti={setTestEseguiti} />
        </div>
    )
}

export default ContainerTabListaTest