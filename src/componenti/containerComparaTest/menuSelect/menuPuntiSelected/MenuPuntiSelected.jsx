import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MenuPuntiSelected.module.css'
import Button from '@mui/material/Button'

const MenuPuntiSelected = props => {

    const { puntiSelected, setPuntiSelected } = props

    const { t, i18n } = useTranslation()

    return(
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>{t('scrivi-framework:corsa:data')}</th>
                        <th>{t('analisi-test:tipo-test')}</th>
                        <th>{t('scrivi-framework:corsa:elimina')}</th>
                    </tr>
                </thead>
                <tbody>
                    {puntiSelected.map((test, c) => {
                        return <tr key={c}>
                            <td>{test.data}</td>
                            <td>{test.tipoTest}</td>
                            <td><Button variant="contained"
                            onClick={() => setPuntiSelected(puntiSelected.filter(el => el.id !== test.id))}>
                                {t('scrivi-framework:corsa:elimina')}</Button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MenuPuntiSelected

