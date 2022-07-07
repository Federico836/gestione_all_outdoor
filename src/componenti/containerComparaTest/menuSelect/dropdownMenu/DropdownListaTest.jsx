import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DropdownMenu.module.css'
/* import { convertiNomi } from '../../utils/funzioni' */

const DropdownListaTest = props => {

    const { listaPunti, puntiSelected, setPuntiSelected } = props

    const { t, i18n } = useTranslation()

    const [mouseOver, setMouseOver] = useState(t('analisi-test:seleziona-test')+" ᐁ") 

    return(
        <div className={styles.dropdown} onMouseOver={() => setMouseOver(t('analisi-test:seleziona-test')+" ᐃ")}
        onMouseOut={() => setMouseOver(t('analisi-test:seleziona-test')+" ᐁ")}>
            <button className={styles.dropbtn}>{mouseOver}</button>
            <div className={styles.dropdownContent}>
            {listaPunti.map((test, index) => <p key={index}
                onClick={() => setPuntiSelected([...puntiSelected, test])}>{test.data}<br />{test.tipoTest}</p>
            )}
            </div>
        </div>
    )
}

export default DropdownListaTest