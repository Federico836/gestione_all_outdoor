import React from "react"
import { useTranslation } from 'react-i18next'
import { toHHMMSS, getSecondsFromHHMMSS } from "../../../../utils/funzioni" 
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { distanza, setDistanza, tempo, setTempo, setData, setNomeFramework, velocitaKmh, tempoPer1000m,
        setTempoPer1000m } = props

    const { t, i18n } = useTranslation()

    const onBlurTempo = event => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setTempo(time)
    }
    const onBlurTempo1000m = event => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setTempoPer1000m(time)
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
                {t('scrivi-framework:corsa:tempo')} <input type="text" value={tempo} onChange={e => setTempo(e.target.value)} onBlur={onBlurTempo} />
            </div>
            <div>
                {t('scrivi-framework:corsa:passo')} 1000 <input type="text" value={tempoPer1000m} onChange={e => setTempoPer1000m(e.target.value)} onBlur={onBlurTempo1000m} />
            </div>
            <div>
                {t('scrivi-framework:corsa:velocita')} <input type="text" value={isFinite(velocitaKmh) ? Math.round(velocitaKmh*100)/100 : ""} />
            </div>
            <div>
                {t('scrivi-framework:corsa:nome-framework')} <input type="text" defaultValue={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
