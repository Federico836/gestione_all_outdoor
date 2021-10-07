import React from "react"
import { useTranslation } from 'react-i18next'
import { toHHMMSS, getSecondsFromHHMMSS } from "../../../../utils/funzioni" 
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { distanza, setDistanza, tempo, setTempo, setData, setNomeFramework } = props

    const { t, i18n } = useTranslation()

    const modifica = event => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        /* const time = toHHMMSS(seconds) */
        setTempo(seconds)
    }

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:corsa:corsa')}</span>
            </div>
            <div>
                {t('scrivi-framework:corsa:data')} <input type="date" onChange={e => setData(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:corsa:distanza')} <input type="number" value={distanza} onChange={e => setDistanza(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:corsa:tempo')} <input type="text" value={tempo} onChange={e => setTempo(e.target.value)} onBlur={modifica} />
            </div>
            <div>
                {t('scrivi-framework:corsa:nome-framework')} <input type="text" value={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
