import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../utils/funzioni.js"
import styles from './TabCorsaAddRiga.module.css'

const TabCorsaAddRiga = (props) => {

    const { aggiungiRiga, datiSingolaRiga, setDatiSingolaRiga, modificaRiga, zoneCalcolate } = props

    const { t, i18n } = useTranslation()

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
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:zona')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:serie')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:ripetizioni')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:distanza')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:recupero')}</th>
                        <th style={{textAlign: 'center'}}>Note</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select value={datiSingolaRiga.zona.zona} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, zona: zoneCalcolate[e.target.value-1]})}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </td>
                            <td><input type="number" min="0" value={datiSingolaRiga.serie} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, serie: e.target.value})}} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.ripetizioni} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, ripetizioni: e.target.value})}} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.distanza} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, distanza: e.target.value})}} /></td>
                            <td><input type="text" onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, recupero: e.target.value})}} onBlur={onBlurRecupero} value={datiSingolaRiga.recupero} /></td>
                            <td><input type="text" value={datiSingolaRiga.note} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, note: e.target.value})}} /></td>
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

export default TabCorsaAddRiga

