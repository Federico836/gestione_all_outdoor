import React from "react"
import { useTranslation } from 'react-i18next'

import styles from './TabSelectSport.module.css'

const TabSelectSport = () => {
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
                    <td>{t('scrivi-framework:ciclismo:ciclismo')}</td>
                </tr>
                <tr>
                    <td>{t('scrivi-framework:corsa:corsa')}</td>
                </tr>
                <tr>
                    <td>{t('scrivi-framework:nuoto:nuoto')}</td>
                </tr>
                <tr>
                    <td>{t('scrivi-framework:palestra:palestra')}</td>
                </tr>
                <tr>
                    <td>{t('scrivi-framework:combinati-tri:combinati-tri')}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TabSelectSport