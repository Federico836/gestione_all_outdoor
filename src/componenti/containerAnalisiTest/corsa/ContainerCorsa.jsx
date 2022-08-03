import React, { useState } from "react"
import MaderCorsa from "./testMader/MaderCorsa"
/* import BottoniTop from "../bottoniTop/BottoniTop" */
import { useTranslation } from 'react-i18next'
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen, utente } = props

    const [tipoTest, setTipoTest] = useState("mader")

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            {/* <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaTest={["mader"]} />
            <h2 style={{textAlign: "left"}}>{t("scrivi-framework:corsa:corsa")}</h2> */}
            {tipoTest==="mader" ?
            <MaderCorsa setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest} utente={utente} /> : null}
        </div>
    )
}

export default ContainerCorsa