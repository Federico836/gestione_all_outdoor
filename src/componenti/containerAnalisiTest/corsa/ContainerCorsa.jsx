import React, { useState } from "react"
import MaderCorsa from "./testMader/MaderCorsa"
import BottoniTop from "../bottoniTop/BottoniTop"
import { useTranslation } from 'react-i18next'
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen } = props

    const [tipoTest, setTipoTest] = useState("mader")

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest} />
            <h2 style={{textAlign: "left"}}>{t("scrivi-framework:corsa:corsa")}</h2>
            {tipoTest==="mader" ?
            <MaderCorsa /> : null}
        </div>
    )
}

export default ContainerCorsa