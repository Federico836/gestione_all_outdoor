import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from "./BottoniTop.module.css"

const BottoniTop = props => {
    const { setPagina, open, setOpen, utente } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
            <Button variant="contained" onClick={() => setOpen(!open)}>menu</Button>
            {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
        </div>
    )
}

export default BottoniTop