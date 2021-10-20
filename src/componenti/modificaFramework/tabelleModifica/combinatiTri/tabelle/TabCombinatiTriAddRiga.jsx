import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../../utils/funzioni.js"
import styles from './TabCombinatiTriAddRiga.module.css'

const TabPalestraAddRiga = (props) => {

    const { aggiungiRiga, datiSingolaRiga, setDatiSingolaRiga, modificaRiga } = props

    const { t, i18n } = useTranslation()

    /* const onBlurDurata = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setDatiSingolaRiga({...datiSingolaRiga, durata: time})
    } */

    const onBlurRecupero = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setDatiSingolaRiga({...datiSingolaRiga, recupero: time})
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTab}>
                <table className={styles.tabella}>
                    <thead>
                        <th style={{textAlign: 'center'}}>Sport</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:zona')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:serie')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:ripetizioni')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:tempo-dist')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:passo')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:combinati-tri:recupero')}</th>
                        <th style={{textAlign: 'center'}}>Note</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, sport: e.target.value})}} value={datiSingolaRiga.sport} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, zona: e.target.value})}} value={datiSingolaRiga.zona} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.serie} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, serie: e.target.value})}} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.ripetizioni} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, ripetizioni: e.target.value})}} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, tempoDist: e.target.value})}} value={datiSingolaRiga.tempoDist} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, passo: e.target.value})}} value={datiSingolaRiga.passo} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, recupero: e.target.value})}} onBlur={onBlurRecupero} value={datiSingolaRiga.recupero} /></td>
                            <td><input type="text" value={datiSingolaRiga.note} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, note: e.target.value})}} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.bottoneAdd}>
                <Button variant="contained" onClick={() => aggiungiRiga(datiSingolaRiga)}>{modificaRiga ? "✎" : "➕"}</Button>
            </div>
        </div>
    )
}

export default TabPalestraAddRiga
