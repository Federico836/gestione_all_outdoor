import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from './TabCiclismoAddRiga.module.css'

const TabCiclismoAddRiga = (props) => {

    const { aggiungiRiga } = props

    const [zona, setZona] = useState(1)
    const [serie, setSerie] = useState(1)
    const [ripetizioni, setRipetizioni] = useState(1)
    const [durata, setDurata] = useState(1)
    const [recupero, setRecupero] = useState(1)
    const [rpm, setRpm] = useState(1)
    const [note, setNote] = useState(1)

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
                            <td><input type="text" onChange={(e) => {setZona(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setSerie(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setRipetizioni(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setDurata(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setRecupero(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setRpm(e.target.value)}} /></td>
                            <td><input type="text" onChange={(e) => {setNote(e.target.value)}} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.bottoneAdd}>
                <Button variant="contained"
                onClick={() => aggiungiRiga({zona, serie, ripetizioni, durata, recupero, rpm, note})}>add</Button>
            </div>
        </div>
    )
}

export default TabCiclismoAddRiga
