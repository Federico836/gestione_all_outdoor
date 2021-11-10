import React from "react"
import { useTranslation } from 'react-i18next'

const TabDatiWeek = props => {
    const {  } = props

    const { t, i18n } = useTranslation()

    return (
        <table>
            <thead>
                <th>{t('esporta:report:tab-dati-week:settimana')}</th>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td colSpan="2">{t('scrivi-framework:ciclismo:ciclismo')}</td>
                    <td colSpan="2">{t('scrivi-framework:corsa:corsa')}</td>
                    <td colSpan="2">{t('scrivi-framework:nuoto:nuoto')}</td>
                </tr>
                <tr>
                    <td>WLT</td>
                </tr>
                <tr>
                    <td>WLS</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                </tr>
                <tr>
                    <td>{t('esporta:report:tab-dati-week:densita')}</td>
                </tr>
                <tr rowSpan="8">
                    <td>{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                </tr>
                <tr rowSpan="5">
                    <td>TRIMP</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TabDatiWeek