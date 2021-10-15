import React from "react"
import { useTranslation } from 'react-i18next'

import styles from './TabListaFramework.module.css'

const TabListaFramework = () => {
    const { t, i18n } = useTranslation()

    const lista = []
    for(let c=0;c<100;c++) {
        lista.push(<tr>
            <td>hstdfht</td>
            <td>hstdfht</td>
            <td>hstdfht</td>
            <td>🖉</td>
        </tr>)
    }

    return (
        <div>
            <div className={styles.cerca}>
                {t('modifica-framework:cerca')}: <input type="text" />
            </div>
            <div className={styles.containerTab}>
                <table className={styles.tabListaFramework}>
                    <thead>
                        <tr>
                            <th>Sport</th>
                            <th>{t('modifica-framework:nome-framework')}</th>
                            <th>{t('modifica-framework:data-salvataggio')}</th>
                            <th>{t('modifica-framework:modifica')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabListaFramework