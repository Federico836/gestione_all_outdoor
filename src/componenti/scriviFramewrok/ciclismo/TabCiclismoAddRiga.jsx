import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from './TabCiclismoAddRiga.module.css'

const TabCiclismoAddRiga = (props) => {

    const { aggiungiRiga, datiSingolaRiga, setDatiSingolaRiga } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.containerTab}>
                <table className={styles.tabella}>
                    <thead>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:zona')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:serie')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:ripetizioni')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:durata')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:recupero')}</th>
                        <th style={{textAlign: 'center'}}>Rpm</th>
                        <th style={{textAlign: 'center'}}>Note</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="number" value={datiSingolaRiga.zona} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, zona: e.target.value})}} /></td>
                            <td><input type="number" value={datiSingolaRiga.serie} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, serie: e.target.value})}} /></td>
                            <td><input type="number" value={datiSingolaRiga.ripetizioni} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, ripetizioni: e.target.value})}} /></td>
                            <td><input type="time" value={datiSingolaRiga.durata} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, durata: e.target.value})}} /></td>
                            <td><input type="number" value={datiSingolaRiga.recupero} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, recupero: e.target.value})}} /></td>
                            <td><input type="number" value={datiSingolaRiga.rpm} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, rpm: e.target.value})}} /></td>
                            <td><input type="text" value={datiSingolaRiga.note} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, note: e.target.value})}} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.bottoneAdd}>
                <Button variant="contained"
                onClick={() => aggiungiRiga(datiSingolaRiga)}>➕</Button>
            </div>
        </div>
    )
}

export default TabCiclismoAddRiga
