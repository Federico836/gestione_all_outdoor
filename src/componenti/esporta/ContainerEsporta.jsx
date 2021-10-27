import React from 'react'
import { useState } from 'react'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabValori from './tabelle/TabValori'
import Report from './tabelle/Report'
import { useTranslation } from 'react-i18next'

import { Button } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina } = props

    const [listaEventi, setListaEventi] = useState([])
    const [rangeDateSelect, setRangeDateSelect] = useState(null)
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [passoNuoto, setPassoNuoto] = useState(0)
    const [passoCorsa, setPassoCorsa] = useState(0)
    const [report, setReport] = useState(false)

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            {report ? 
            <Report listaEventi={listaEventi} rangeDateSelect={rangeDateSelect} ftp={ftp} fc={fc} /> :
            <>
                <div className={styles.containerBottoniTop}>
                    <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                </div>

                <div className={styles.containerGrid}>
                    <div>
                        <Calendario listaEventi={listaEventi} setListaEventi={setListaEventi} setRangeDateSelect={setRangeDateSelect} />
                    </div>
                    <div>
                        <TabListaFramework />
                    </div>
                </div>

                <TabValori ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} passoNuoto={passoNuoto} setPassoNuoto={setPassoNuoto}
                passoCorsa={passoCorsa} setPassoCorsa={setPassoCorsa} />

                <div className={styles.containerBottoniBottom}>
                    <Button variant="contained" onClick={() => setReport(true)}>REPORT</Button>
                </div>
            </>}
        </div>
    )
}

export default ContainerEsporta