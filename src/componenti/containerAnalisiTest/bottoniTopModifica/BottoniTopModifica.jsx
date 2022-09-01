import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from "./BottoniTopModifica.module.css"

const BottoniTopModifica = props => {
    const { setTestEseguiti, salvaDati } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <Button variant="contained" onClick={() => setTestEseguiti("eseguiti")}>{t('analisi-test:test-eseguiti')}</Button>
            <div>{t('modifica-framework:modifica')}</div>
            <Button variant="contained" onClick={salvaDati}>{t('esporta:salva')}</Button>
        </div>
    )
}

export default BottoniTopModifica