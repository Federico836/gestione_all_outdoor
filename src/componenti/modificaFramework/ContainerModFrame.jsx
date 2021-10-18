import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import TabSelectSport from './tabelle/TabSelectSport'
import TabListaFramework from "./tabelle/TabListaFramework"

import styles from './ContainerModFrame.module.css'

const ContainerModFrame = props => {
    const { setPagina } = props

    const [tipoSport, setTipoSport] = useState("tutti")

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.bottoneIndietro}>
                <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                <div className={styles.titolo}>
                    {t('modifica-framework:modifica-framework')}
                </div>
            </div>
            <div className={styles.containerGrid}>
                <div>
                    <TabSelectSport setTipoSport={setTipoSport} />
                </div>
                <div>
                    <TabListaFramework tipoSport={tipoSport} />
                </div>
            </div>
        </div>
    )
}

export default ContainerModFrame
