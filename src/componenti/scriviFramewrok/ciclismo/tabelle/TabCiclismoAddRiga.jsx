import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../utils/funzioni.js"
import styles from './TabCiclismoAddRiga.module.css'

const TabCiclismoAddRiga = (props) => {

    const { aggiungiRiga, datiSingolaRiga, setDatiSingolaRiga, modificaRiga } = props

    const { t, i18n } = useTranslation()

    const onBlurDurata = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setDatiSingolaRiga({...datiSingolaRiga, durata: time})
    }

    const onBlurRecupero = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setDatiSingolaRiga({...datiSingolaRiga, recupero: time})
    }

    let zonaWatt = ""
    let zonaFc = ""
    if(datiSingolaRiga.percZona!=="") {
        zonaWatt = datiSingolaRiga.wattPerc
        zonaFc = datiSingolaRiga.fcPerc
    }
    else {
        zonaWatt = (datiSingolaRiga.zona>1 && datiSingolaRiga.zona<7) ? (datiSingolaRiga.wattMin+"-"+datiSingolaRiga.wattMax) : datiSingolaRiga.wattMax
        zonaFc = (datiSingolaRiga.zona>1 && datiSingolaRiga.zona<5) ? (datiSingolaRiga.fcMin+"-"+datiSingolaRiga.fcMax) : datiSingolaRiga.fcMax
    }


    return (
        <div className={styles.container}>
            <div className={styles.containerTab}>
                <table className={styles.tabella}>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:zona')}</th>
                            <th style={{textAlign: 'center'}}>%</th>
                            <th style={{textAlign: 'center'}}>Watt</th>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:fc')}</th>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:serie')}</th>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:ripetizioni')}</th>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:tempo')}</th>
                            <th style={{textAlign: 'center'}}>{t('scrivi-framework:ciclismo:recupero')}</th>
                            <th style={{textAlign: 'center'}}>Rpm</th>
                            <th style={{textAlign: 'center'}}>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select value={datiSingolaRiga.zona} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, zona: e.target.value})}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>{/* <input type="number" min="1" max="7" value={datiSingolaRiga.zona} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, zona: e.target.value})}} /> */}
                            </td>
                            <td><input type="number" min="0" value={datiSingolaRiga.percZona} onChange={e => setDatiSingolaRiga({...datiSingolaRiga, percZona: e.target.value})} /></td>
                            <td><input type="text" min="0" value={zonaWatt} /></td>
                            <td><input type="text" min="0" value={zonaFc} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.serie} onChange={e => setDatiSingolaRiga({...datiSingolaRiga, serie: e.target.value})} /></td>
                            <td><input type="number" min="0" value={datiSingolaRiga.ripetizioni} onChange={e => setDatiSingolaRiga({...datiSingolaRiga, ripetizioni: e.target.value})} /></td>
                            {/* <td><input type="time" value={datiSingolaRiga.durata} onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, durata: e.target.value})}} /></td> */}
                            <td><input type="text" onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, durata: e.target.value})}} onBlur={onBlurDurata} value={datiSingolaRiga.durata} /></td>
                            <td><input type="text" onChange={(e) => {setDatiSingolaRiga({...datiSingolaRiga, recupero: e.target.value})}} onBlur={onBlurRecupero} value={datiSingolaRiga.recupero} /></td>
                            <td><input type="text" min="0" value={datiSingolaRiga.rpm} onChange={e => setDatiSingolaRiga({...datiSingolaRiga, rpm: e.target.value})} /></td>
                            <td><input type="text" value={datiSingolaRiga.note} onChange={e => setDatiSingolaRiga({...datiSingolaRiga, note: e.target.value})} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.bottoneAdd}>
                <Button variant="contained" onClick={() => aggiungiRiga(datiSingolaRiga)}>{modificaRiga ? "???" : "???"}</Button>
            </div>
        </div>
    )
}

export default TabCiclismoAddRiga
