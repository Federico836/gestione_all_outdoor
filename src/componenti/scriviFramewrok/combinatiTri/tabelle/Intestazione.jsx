import React from "react"
import { useTranslation } from 'react-i18next'
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { setData, setNomeFramework } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:combinati-tri:combinati-tri')}</span>
            </div>
            <div>
                {t('scrivi-framework:combinati-tri:data')} <input type="date" onChange={e => setData(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:combinati-tri:nome-framework')} <input type="text" defaultValue={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
