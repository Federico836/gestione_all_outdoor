import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../../utils/funzioni.js"
import styles from './TabNuotoAddRiga.module.css'

const TabNuotoAddRiga = (props) => {

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
                        <th style={{textAlign: 'center'}}>Obbiettivo</th>
                        <th style={{textAlign: 'center'}}>Fase di lavoro</th>
                        <th style={{textAlign: 'center'}}>Stile</th>
                        <th style={{textAlign: 'center'}}>Attrezzo</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:zona')}</th>
                        {/* <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:serie')}</th> */}
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:ripetizioni')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:tempo')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:recupero')}</th>
                        <th style={{textAlign: 'center'}}>{t('scrivi-framework:corsa:distanza')} m/yrd</th>
                        <th style={{textAlign: 'center'}}>Calorie</th>
                        <th style={{textAlign: 'center'}}>Note</th>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                                <select value={datiSingolaRiga.durationType} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, durationType: e.target.value})}}>
                                    <option value="TIME">Tempo</option>
                                    <option value="DISTANCE">Distanza</option>
                                    <option value="CALORIES">Calorie</option>
                                    <option value="HR_LESS_THAN">Freq. Cardiaca</option>
                                    <option value="OPEN">Altro</option>
                                </select>
                            </td>
                            <td>
                                <select value={datiSingolaRiga.intensity} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, intensity: e.target.value})}}>
                                    <option value="REST">Recupero passivo</option>
                                    <option value="WARMUP">Riscaldamento</option>
                                    <option value="COOLDOWN">Defaticamento</option>
                                    <option value="RECOVERY">Recupero</option>
                                    <option value="INTERVAL">Intervallo</option>
                                </select>
                            </td>
                            <td>
                                <select value={datiSingolaRiga.strokeType} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, strokeType: e.target.value})}}>
                                    <option value="BACKSTROKE">Dorso</option>
                                    <option value="BREASTSTROKE">Rana</option>
                                    <option value="DRILL">Tecnica</option>
                                    <option value="BUTTERFLY">Farfalla</option>
                                    <option value="FREESTYLE">Stile libero</option>
                                    <option value="MIXED">Misto</option>
                                </select>
                            </td>
                            <td>
                                <select value={datiSingolaRiga.equipmentType} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, equipmentType: e.target.value})}}>
                                    <option value="NONE">Nessuno</option>
                                    <option value="SWIM_FINS">Pinne</option>
                                    <option value="SWIM_KICKBOARD">Tavoletta</option>
                                    <option value="SWIM_PADDLES">Palette</option>
                                    <option value="SWIM_PULL_BUOY">Pull Buoy</option>
                                    <option value="SWIM_SNORKEL">Snorkel</option>
                                </select>
                            </td>
                            <td>
                                <select value={datiSingolaRiga.zona.zona} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, zona: zoneCalcolate[e.target.value-1]})}}>
                                    <option value="1">{"A1"}</option>
                                    <option value="2">{"A2"}</option>
                                    <option value="3">{"B1"}</option>
                                    <option value="4">{"B2"}</option>
                                    <option value="5">{"C1"}</option>
                                    <option value="6">{"C2"}</option>
                                    <option value="7">{"C3"}</option>
                                    <option value="8">{"D"}</option>
                                </select>
                            </td>
                            {/* <td><input type="number" min="0" value={datiSingolaRiga.serie} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, serie: e.target.value})}} /></td> */}
                            <td><input type="number" min="0" value={datiSingolaRiga.ripetizioni} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, ripetizioni: e.target.value})}} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, tempo: e.target.value})}} value={datiSingolaRiga.tempo} /></td>
                            <td><input type="text" onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, recupero: e.target.value})}} onBlur={onBlurRecupero} value={datiSingolaRiga.recupero} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.distanza} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, distanza: e.target.value})}} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.calorie} onChange={e => {setDatiSingolaRiga({...datiSingolaRiga, calorie: e.target.value})}} /></td>
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

export default TabNuotoAddRiga

