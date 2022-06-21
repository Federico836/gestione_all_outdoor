import React, { useState } from "react"
import MaderCorsa from "./test/MaderCorsa"
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const {  } = props

    const [tipoTest, setTipoTest] = useState("mader")

    return (
        <div className={styles.container}>
            {tipoTest==="mader" ?
            <MaderCorsa /> : null}
        </div>
    )
}

export default ContainerCorsa