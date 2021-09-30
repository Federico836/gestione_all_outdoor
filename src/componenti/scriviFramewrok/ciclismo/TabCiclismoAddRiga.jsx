import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from './TabCiclismoAddRiga.module.css'

const TabCiclismoAddRiga = (props) => {

    const { aggiungiRiga } = props

    const [zona, setZona] = useState("")
    const [serie, setSerie] = useState("")
    const [ripetizioni, setRipetizioni] = useState("")
    const [durata, setDurata] = useState("")
    const [recupero, setRecupero] = useState("")
    const [rpm, setRpm] = useState("")
    const [note, setNote] = useState("")

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
                            <td><input type="number" onChange={(e) => {setZona(e.target.value)}} /></td>
                            <td><input type="number" onChange={(e) => {setSerie(e.target.value)}} /></td>
                            <td><input type="number" onChange={(e) => {setRipetizioni(e.target.value)}} /></td>
                            <td><input type="number" onChange={(e) => {setDurata(e.target.value)}} /></td>
                            <td><input type="number" onChange={(e) => {setRecupero(e.target.value)}} /></td>
                            <td><input type="number" onChange={(e) => {setRpm(e.target.value)}} /></td>
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
