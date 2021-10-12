import React from "react"
import { useTranslation } from 'react-i18next'
import { toHHMMSS, getSecondsFromHHMMSS } from "../../../../utils/funzioni" 
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { distanza, setDistanza, tempo, setTempo, setData, setNomeFramework, velocitaKmh, tempoPer100m,
        setTempoPer100m } = props

    const calcPassoPer100 = (distanza, tempo) => {

        if(!distanza || !tempo) return 0

        const v = Number(distanza)/tempo
        const p = 100/v

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
    const onBlurTempo100m = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        const time = toHHMMSS(seconds)
        setTempoPer100m(seconds)
    }

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:nuoto:nuoto')}</span>
            </div>
            <div>
                {t('scrivi-framework:nuoto:data')} <input type="date" onChange={e => setData(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:nuoto:distanza')} <input type="number" value={distanza} onChange={e => setDistanza(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:nuoto:tempo')} ({toHHMMSS(tempo)}) <input type="text" /* value={toHHMMSS(tempo)}  *//* onChange={e => setTempo(e.target.value)} */ onBlur={onBlurTempo} />
                <br/><span><small>{t('scrivi-framework:nuoto:passo')} 100 m/yd:  {calcPassoPer100(distanza, tempo)}</small></span>
            </div>
            <div>
                {t('scrivi-framework:nuoto:passo')} 100 m/yd ({toHHMMSS(tempoPer100m)}) <input type="text" /* value={toHHMMSS(tempoPer1000m)} */ /* onChange={e => setTempoPer1000m(e.target.value)} */ onBlur={onBlurTempo100m} />
            </div>
            <div>
                {t('scrivi-framework:nuoto:velocita')} <input type="text" value={isFinite(velocitaKmh) ? Math.round(velocitaKmh*100)/100 : ""} />
            </div>
            <div>
                {t('scrivi-framework:nuoto:nome-framework')} <input type="text" defaultValue={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
