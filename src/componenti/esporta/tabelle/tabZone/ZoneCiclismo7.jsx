import React from 'react'
import './ZoneCiclismo7.css'
import { useTranslation } from 'react-i18next'

const ZoneCiclismo7 = props => {
    const {zoneCalcCiclismo} = props

    const { t, i18n } = useTranslation()

    const verde = {backgroundColor: "green"}
    const rosso = {backgroundColor: "red"}

    return(
        <div className="zone-ciclismo7">
            <table>
                <thead>
                    <tr>
                        <td colSpan="3"></td>
                        <td colSpan="3">{t('esporta:tab-zone:ciclismo:potenza')}</td>
                        <td colSpan="3">{t('esporta:tab-zone:ciclismo:fc')}</td>
                        <td>RPE</td>
                        <td>{t('esporta:tab-zone:ciclismo:durata-continuativa')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:durata-intervallata')}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{t('esporta:tab-zone:ciclismo:zona')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:descrizione')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla')}</td>
                        <td>% FTP</td>
                        <td style={verde}>MIN</td>
                        <td style={verde}>MAX</td>
                        <td>{t('esporta:tab-zone:ciclismo:fc-percentuale')}</td>
                        <td style={rosso}>MIN</td>
                        <td style={rosso}>MAX</td>
                        <td></td>
                        <td>{t('esporta:tab-zone:ciclismo:tempo-allenamento')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:tempo-ripetuta')}</td>
                    </tr>
                    <tr>
                        <td>Z1</td>
                        <td>{t('esporta:tab-zone:ciclismo:recupero-attivo')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z1')}</td>
                        <td>55</td>
                        <td colSpan="2" style={verde}>{Math.round(zoneCalcCiclismo[0].watt_max)}</td>
                        <td>{"< 68"}</td>
                        <td colSpan="2" style={rosso}>{Math.round(zoneCalcCiclismo[0].fc_max)}</td>
                        <td>{"< 2"}</td>
                        <td>30-90 min</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>Z2</td>
                        <td>{t('esporta:tab-zone:ciclismo:fondo-lungo')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z2')}</td>
                        <td>56-75</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[1].watt_min)}</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[1].watt_max)}</td>
                        <td>69-83</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[1].fc_min)}</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[1].fc_max)}</td>
                        <td>2 3</td>
                        <td>60 min - 5 h</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>Z3</td>
                        <td>{t('esporta:tab-zone:ciclismo:fondo-medio')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z3')}</td>
                        <td>76-90</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[2].watt_min)}</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[2].watt_max)}</td>
                        <td>84-94</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[2].fc_min)}</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[2].fc_max)}</td>
                        <td>3 4</td>
                        <td>1-3 h</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>Z4</td>
                        <td>{t('esporta:tab-zone:ciclismo:soglia-anaerobica')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z5')}</td>
                        <td>95-105</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[3].watt_min)}</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[3].watt_max)}</td>
                        <td>95-105</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[3].fc_min)}</td>
                        <td style={rosso}>{Math.round(zoneCalcCiclismo[3].fc_max)}</td>
                        <td>4 5</td>
                        <td>40-60 min</td>
                        <td>5-30 min</td>
                    </tr>
                    <tr>
                        <td>Z5</td>
                        <td>VO2MAX</td>
                        <td>VO2</td>
                        <td>106-120</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[4].watt_min)}</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[4].watt_max)}</td>
                        <td>{"> 106"}</td>
                        <td colSpan="2" style={rosso}>{Math.round(zoneCalcCiclismo[4].fc_max)}</td>
                        <td>6 7</td>
                        <td>N/A</td>
                        <td>3-8 min</td>
                    </tr>
                    <tr>
                        <td>Z6</td>
                        <td>{t('esporta:tab-zone:ciclismo:capacita-anaerobica')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z7')}</td>
                        <td>121-150</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[5].watt_min)}</td>
                        <td style={verde}>{Math.round(zoneCalcCiclismo[5].watt_max)}</td>
                        <td>N/A</td>
                        <td style={rosso} colSpan="2">{zoneCalcCiclismo[5].fc_max}</td>
                        <td>{"> 7"}</td>
                        <td>N/A</td>
                        <td>30 sec- 2 min</td>
                    </tr>
                    <tr>
                        <td>Z7</td>
                        <td>{t('esporta:tab-zone:ciclismo:potenza-neuromuscolare')}</td>
                        <td>{t('esporta:tab-zone:ciclismo:sigla-z8')}</td>
                        <td>MAX</td>
                        <td style={verde} colSpan="2">{zoneCalcCiclismo[6].watt_max}</td>
                        <td>N/A</td>
                        <td style={rosso} colSpan="2">{zoneCalcCiclismo[6].fc_max}</td>
                        <td>MAX</td>
                        <td>N/A</td>
                        <td>{"< 30 sec"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ZoneCiclismo7