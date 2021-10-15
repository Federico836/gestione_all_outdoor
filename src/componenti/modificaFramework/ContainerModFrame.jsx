import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import TabSelectSport from './tabelle/TabSelectSport'

import styles from './ContainerModFrame.module.css'

const ContainerModFrame = props => {
    const { setPagina } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.bottoneIndietro}>
                <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
            </div>
            <div className={styles.containerGrid}>
                <div>
                    <TabSelectSport />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ContainerModFrame
