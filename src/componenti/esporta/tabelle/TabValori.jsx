import React from "react"
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../utils/funzioni"
import { useTranslation } from 'react-i18next'
import styles from './TabValori.module.css'

const TabValori = props => {
    const { ftp, setFtp, fc, setFc, passoNuoto, setPassoNuoto, passoCorsa, setPassoCorsa, ruoloLoggedUser } = props

    const { t, i18n } = useTranslation()

    const onBlurPassoCorsa = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoCorsa(seconds)
    }

    const onBlurPassoNuoto = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoNuoto(seconds)
    }

    const disabilita = ruoloLoggedUser==="allenatore" ? false : true

    return (
        <fieldset className={styles.container}>
            <legend>{t('esporta:valori')}:</legend>

            <div className={styles.containerCiclismo}>
                <div>
                    {t('scrivi-framework:ciclismo:ciclismo')}: <input type="number" min={0} value={fc} onChange={e => setFc(e.target.value)} disabled={disabilita} /> {t('analisi-test:corsa:mader:fc')}
                </div>
                <div>
                    <input type="number" min={0} value={ftp} onChange={e => setFtp(e.target.value)} disabled={disabilita} /> ftp
                </div>
            </div>

            <div>
                {t('scrivi-framework:corsa:corsa')}: ({toHHMMSS(passoCorsa)}) <input type="text" onBlur={onBlurPassoCorsa} disabled={disabilita} /> passo 1000
            </div>

            <div>
                {t('scrivi-framework:nuoto:nuoto')}: ({toHHMMSS(passoNuoto)}) <input type="text" onBlur={onBlurPassoNuoto} disabled={disabilita} /> passo 100
            </div>
        </fieldset>
    )
}

export default TabValori

