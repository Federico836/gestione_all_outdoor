import React, { useState } from "react"
import MaderNuoto from "./testMader/MaderNuoto"
/* import BottoniTop from "../bottoniTop/BottoniTop" */
import { useTranslation } from 'react-i18next'
import styles from "./ContainerNuoto.module.css"

const ContainerNuoto = props => {
    const { setPagina, open, setOpen, utente } = props

    const [tipoTest, setTipoTest] = useState("mader")

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            {/* <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest}
            listaTest={["mader"]} />
            <h2 style={{textAlign: "left"}}>{t("scrivi-framework:nuoto:nuoto")}</h2> */}
            {tipoTest==="mader" ?
            <MaderNuoto setPagina={setPagina} open={open} setOpen={setOpen} tipoTest={tipoTest} setTipoTest={setTipoTest} utente={utente} /> : null}
        </div>
    )
}

export default ContainerNuoto