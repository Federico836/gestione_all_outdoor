import React from 'react'
import { useState } from 'react'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import { useTranslation } from 'react-i18next'

import { Button } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina } = props

    const [listaEventi, setListaEventi] = useState([])

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
        </div>
    )
}

export default ContainerEsporta