import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from "./BottoniTop.module.css"

const BottoniTop = props => {

    const { setTestEseguiti } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>

            <Button variant="contained" onClick={() => setTestEseguiti("analisi")}>{t('main-container:indietro')}</Button>

            <div>{t('analisi-test:test-outdoor')}</div> 

        </div>
    )
}

export default BottoniTop
