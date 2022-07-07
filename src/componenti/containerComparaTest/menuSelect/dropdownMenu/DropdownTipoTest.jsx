import React from 'react'
import { useState } from 'react'
import styles from './DropdownMenu.module.css'

const DropdownTipoTest = props => {

    const { listaTipiTest, tipoTest, setTipoTest } = props

    const [mouseOver, setMouseOver] = useState(tipoTest+ " ᐁ") 

    return(
        <div className={styles.dropdown} onMouseOver={() => setMouseOver(tipoTest+" ᐃ")}
        onMouseOut={() => setMouseOver(tipoTest+" ᐁ")}>
            <button className={styles.dropbtn}>{mouseOver}</button>
            <div className={styles.dropdownContent}>
                {listaTipiTest.map((element, index) => <p key={index} onClick={() => setTipoTest(element)}>{element}</p>)}
            </div>
        </div>
    )
}

export default DropdownTipoTest