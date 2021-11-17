import React from "react"
import { useTranslation } from 'react-i18next'
import { toHHMMSS, getSecondsFromHHMMSS } from "../../../../utils/funzioni" 
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { distanza, setDistanza, tempo, setTempo, setData, setNomeFramework, velocitaKmh, tempoPer1000m,
        setTempoPer1000m } = props

    const calcPassoPer1000 = (distanza, tempo) => {

        if(!distanza || !tempo) return 0

        const v = Number(distanza)/tempo
        const p = 1000/v

        return toHHMMSS(p)
    }

    /* useEffect(() => {

        const v = Number(distanza)/tempo
        const p = 1000/v

        if(distanza > 0 && tempo > 0) {
            setTempoPer1000m(p)
            setVelocita(v)
        }

    },[distanza, tempo]) */

    const { t, i18n } = useTranslation()

    const onBlurTempo = event => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setTempo(seconds)
    }
    const onBlurTempo1000m = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setTempoPer1000m(seconds)
    }

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:corsa:corsa')}</span>
            </div>
            <div>
                {t('scrivi-framework:corsa:data')} <input type="date" onChange={e => setData(e.target.value)} />
            </div>
            <fieldset className={styles.riquadroTest}>
                <legend>Test</legend>
                <div>
                    {t('scrivi-framework:corsa:distanza')} Km/Mi <input type="number" value={distanza/1000} onChange={e => setDistanza(e.target.value*1000)} />
                </div>
                <div>
                    {t('scrivi-framework:corsa:tempo')} ({toHHMMSS(tempo)}) <input type="text" /* value={toHHMMSS(tempo)}  *//* onChange={e => setTempo(e.target.value)} */ onBlur={onBlurTempo} />
                    <br/><span><small>{t('scrivi-framework:corsa:passo')} Km/Mi:  {calcPassoPer1000(distanza, tempo)}</small></span>
                </div>
            </fieldset>
            <fieldset className={styles.riquadroTest}>
                <legend>{t('scrivi-framework:corsa:riferimento')}</legend>
                <div>
                    {t('scrivi-framework:corsa:passo')} Km/Mi ({toHHMMSS(tempoPer1000m)}) <input type="text" /* value={toHHMMSS(tempoPer1000m)} */ /* onChange={e => setTempoPer1000m(e.target.value)} */ onBlur={onBlurTempo1000m} />
                </div>
                <div>
                    {t('scrivi-framework:corsa:velocita')} <input type="text" value={isFinite(velocitaKmh) ? Math.round(velocitaKmh*100)/100 : ""} />
                </div>
            </fieldset>
            <div>
                {t('scrivi-framework:corsa:nome-framework')} <input type="text" defaultValue={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
