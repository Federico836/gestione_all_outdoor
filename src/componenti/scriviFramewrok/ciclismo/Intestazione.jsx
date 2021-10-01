import React from "react"
import { useState, useEffect } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { ftp, setFtp, fc, setFc, setData } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:ciclismo:ciclismo')}</span>
            </div>
            <div>
                {t('scrivi-framework:ciclismo:data')} <input type="date" onChange={(e) => setData(e.target.value)} />
            </div>
            <div>
                FTP <input type="number" value={ftp} onChange={(e) => setFtp(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:ciclismo:fc')} <input type="number" value={fc} onChange={(e) => setFc(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
