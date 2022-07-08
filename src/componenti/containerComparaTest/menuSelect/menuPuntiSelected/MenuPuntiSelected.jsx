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
                        <th>{t('comp-test:menu-punti-selected:data')}</th>
                        <th>{t('comp-test:menu-punti-selected:tipo-test')}</th>
                        <th>{t('comp-test:menu-punti-selected:elimina')}</th>
                    </tr>
                </thead>
                <tbody>
                    {puntiSelected.map(test => {
                        return <tr>
                            <td>{test.data}</td>
                            <td>{test.tipoTest}</td>
                            <td><Button variant="contained"
                            onClick={() => setPuntiSelected(puntiSelected.filter(el => el.id !== test.id))}>
                                {t('comp-test:menu-punti-selected:elimina')}</Button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MenuPuntiSelected

