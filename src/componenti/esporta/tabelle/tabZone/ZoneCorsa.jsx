import React from 'react'
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from '../../../../utils/funzioni'

const ZoneCorsa = props => {
    const { zoneCalcCorsa } = props

    const { t, i18n } = useTranslation()

    return (
        <div className="zone-ciclismo7">
            <table>
                <thead>
                    <tr>
                        <td>{t('esporta:tab-zone:corsa:tipo-lavoro')}</td>
                        <td>% {t('esporta:tab-zone:corsa:soglia')}</td>
                        <td></td>
                        <td>{t('esporta:tab-zone:corsa:da')}</td>
                        <td>{t('esporta:tab-zone:corsa:a')}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{t('scrivi-framework:corsa:zone:recupero-attivo')}</td>
                        <td>{"< 72%"}</td>
                        <td>min / 1000</td>
                        <td colSpan="2">{toHHMMSS(1000/zoneCalcCorsa[0].min)}</td>
                    </tr>
                    <tr>
                        <td>{t('scrivi-framework:corsa:zone:fondo-lungo')}</td>
                        <td>73-83%</td>
                        <td>min / 1000</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[1].min)}</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[1].max)}</td>
                    </tr>
                    <tr>
                        <td>{t('scrivi-framework:corsa:zone:fondo-medio')}</td>
                        <td>84-92%</td>
                        <td>min / 1000</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[2].min)}</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[2].max)}</td>
                    </tr>
                    <tr>
                        <td>{t('scrivi-framework:corsa:zone:fondo-veloce')}</td>
                        <td>93-98%</td>
                        <td>min / 1000</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[3].min)}</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[3].max)}</td>
                    </tr>
                    <tr>
                        <td>{t('scrivi-framework:corsa:zone:soglia')}</td>
                        <td>99-102%</td>
                        <td>min / 1000</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[4].min)}</td>
                        <td>{toHHMMSS(1000/zoneCalcCorsa[4].max)}</td>
                    </tr>
                    <tr>
                        <td>VO2Max</td>
                        <td>{"> 102%"}</td>
                        <td>min / 1000</td>
                        <td colSpan="2">{toHHMMSS(1000/zoneCalcCorsa[5].min)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ZoneCorsa