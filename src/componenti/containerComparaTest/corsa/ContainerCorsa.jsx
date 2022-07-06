import React, { useState, useMemo } from "react"
import { useTranslation } from 'react-i18next'
import BottoniTop from "../bottoniTop/BottoniTop"
import MaderCorsa from "./testMader/MaderCorsa"
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen, listaTest } = props

    const { t, i18n } = useTranslation()

    const [tipoTest, setTipoTest] = useState("mader")

    const [puntiSelectedMader, setPuntiSelectedMader] = useState([])

    const listaMader = useMemo(() => listaTest.filter(test => test.tipoTest==="mader"), [listaTest])

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} />
            {tipoTest==="mader" ?
            <MaderCorsa listaTest={listaMader} puntiSelectedMader={puntiSelectedMader}
            setPuntiSelectedMader={setPuntiSelectedMader} setTipoTest={setTipoTest} /> : null}
        </div>
    )
}

export default ContainerCorsa