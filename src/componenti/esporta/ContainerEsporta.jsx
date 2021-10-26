import React from 'react'
import { useState } from 'react'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabValori from './tabelle/TabValori'
import { useTranslation } from 'react-i18next'

import { Button } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina } = props

    const [listaEventi, setListaEventi] = useState([])
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [passoNuoto, setPassoNuoto] = useState(0)
    const [passoCorsa, setPassoCorsa] = useState(0)

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
            </div>

            <div className={styles.containerGrid}>
                <div>
                    <Calendario listaEventi={listaEventi} setListaEventi={setListaEventi} />
                </div>
                <div>
                    <TabListaFramework />
                </div>
            </div>
            <TabValori ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} passoNuoto={passoNuoto} setPassoNuoto={setPassoNuoto}
            passoCorsa={passoCorsa} setPassoCorsa={setPassoCorsa} />
        </div>
    )
}

export default ContainerEsporta