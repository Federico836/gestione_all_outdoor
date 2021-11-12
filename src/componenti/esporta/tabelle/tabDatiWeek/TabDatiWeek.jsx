import React from "react"
import styles from './TabDatiWeek.module.css'
import { useTranslation } from 'react-i18next'

const TabDatiWeek = props => {
    const { settimana, wltCicl } = props

    const { t, i18n } = useTranslation()

    return (
        <div /*  style={{height: "90vh", marginLeft: "auto", marginRight: "auto", marginTop: "6vh"}} */>
            <table className={styles.tabella} /* style={{ height: "100%", border: "solid 1px black", borderCollapse: "collapse"}} */>
                <thead>
                    <tr>
                        <th colSpan="7">{t('esporta:report:tab-dati-week:settimana')+" "+settimana}</th>
                    </tr>
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
                        <td></td>
                        <td>{wltCicl}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>WLS</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:densita')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr rowSpan="8">
                        <td>{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr rowSpan="5">
                        <td>TRIMP</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabDatiWeek