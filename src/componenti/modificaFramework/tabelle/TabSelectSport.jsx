import React from "react"
import { useTranslation } from 'react-i18next'

import styles from './TabSelectSport.module.css'

const TabSelectSport = props => {
    const { setTipoSport } = props

    const { t, i18n } = useTranslation()

    return (
        <table className={styles.tabSelectSport}>
            <thead>
                <tr>
                    <th>{t('modifica-framework:cerca-per-sport')}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td onClick={() => setTipoSport("ciclismo")}>{t('scrivi-framework:ciclismo:ciclismo')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("corsa")}>{t('scrivi-framework:corsa:corsa')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("nuoto")}>{t('scrivi-framework:nuoto:nuoto')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("palestra")}>{t('scrivi-framework:palestra:palestra')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("combinati_tri")}>{t('scrivi-framework:combinati-tri:combinati-tri')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("altri")}>{t('scrivi-framework:sport:altri')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("gara")}>{t('scrivi-framework:gara:gara')}</td>
                </tr>
                <tr>
                    <td onClick={() => setTipoSport("tutti")}>{t('modifica-framework:tutti')}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TabSelectSport