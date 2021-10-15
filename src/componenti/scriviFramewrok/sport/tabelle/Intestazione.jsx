import React from "react"
import { useTranslation } from 'react-i18next'
import styles from './Intestazione.module.css'

const Intestazione = (props) => {

    const { setData, setNomeFramework, nomeSport, setNomeSport } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.containerGrid}>
            <div>
                <span>{t('scrivi-framework:sport:nome-sport')}</span> <input type="text" value={nomeSport} onChange={e => setNomeSport(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:sport:data')} <input type="date" onChange={e => setData(e.target.value)} />
            </div>
            <div>
                {t('scrivi-framework:sport:nome-framework')} <input type="text" defaultValue={""} onChange={e => setNomeFramework(e.target.value)} />
            </div>
        </div>
    )
}

export default Intestazione
