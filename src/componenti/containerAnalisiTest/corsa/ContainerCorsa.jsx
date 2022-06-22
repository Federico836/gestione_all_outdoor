import React, { useState } from "react"
import MaderCorsa from "./test/MaderCorsa"
import BottoniTop from "../bottoniTop/BottoniTop"
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen } = props

    const [tipoTest, setTipoTest] = useState("mader")

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest} />
            {tipoTest==="mader" ?
            <MaderCorsa /> : null}
        </div>
    )
}

export default ContainerCorsa