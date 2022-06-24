import React from "react"
import { useTranslation } from 'react-i18next'
import styles from "./SelezionaPunto.module.css"

const SelezionaPunto = props => {
    const { livAnal, setLivAnal } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div>
                <select onChange={e => setLivAnal(Number(e.target.value))} value={livAnal}>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option value={num} key={num}>{num}</option>)}
                </select>
            </div>
            <div>
                {t('analisi-test:corsa:mader:desc-liv-anal')}
            </div>
        </div>
    )
}

export default SelezionaPunto