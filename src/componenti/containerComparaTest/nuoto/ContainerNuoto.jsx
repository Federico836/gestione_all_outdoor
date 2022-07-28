import React, { useState, useMemo } from "react"
import { useTranslation } from 'react-i18next'
import BottoniTop from "../bottoniTop/BottoniTop"
import MaderNuoto from "./testMader/MaderNuoto"
import styles from "./ContainerNuoto.module.css"

const ContainerNuoto = props => {
    const { setPagina, open, setOpen, listaTest } = props

    const { t, i18n } = useTranslation()

    const [tipoTest, setTipoTest] = useState("mader")

    const [puntiSelectedMader, setPuntiSelectedMader] = useState([])

    const listaMader = useMemo(() => listaTest.filter(test => test.tipoTest==="mader"), [listaTest])

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} />
            {tipoTest==="mader" ?
            <MaderNuoto listaTest={listaMader} puntiSelectedMader={puntiSelectedMader}
            setPuntiSelectedMader={setPuntiSelectedMader} tipoTest={tipoTest} setTipoTest={setTipoTest} /> : null}
        </div>
    )
}

export default ContainerNuoto