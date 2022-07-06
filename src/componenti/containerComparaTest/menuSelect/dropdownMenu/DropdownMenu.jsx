import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DropdownMenu.module.css'
import {convertiNomi} from '../../utils/funzioni'


const DropdownMenu = (props) => {

    const { listaPunti, listaPuntiSelected, setListaPuntiSelected } = props

    const { t, i18n } = useTranslation()

    const [mouseOver, setMouseOver] = useState(t('comp-test:seleziona-test')+" ᐁ") 

    return(
        <div className={styles.dropdown} onMouseOver={() => {setMouseOver(t('comp-test:seleziona-test')+" ᐃ")}}
        onMouseOut={() => {setMouseOver(t('comp-test:seleziona-test')+" ᐁ")}}>
            <button className={styles.dropbtn}>{mouseOver}</button>
            <div className={styles.dropdownContent}>
            {listaPunti.map((element, index) => {
                return <p key={index} onClick={() => {
                    listaPuntiSelected.length<7 ? setListaPuntiSelected([...listaPuntiSelected, element]) : alert(t('comp-test:alerts:max-test-comp'))
                }}>{element.dati.data}<br />{convertiNomi(element.dati.tipoAll)}</p>
            })}
            </div>
        </div>
        /* <div>
            <form action="/action_page.php">
            <label for="cars">Choose a car:</label>
            <select name="cars" id="cars">
                {listaPunti.map((element, index) => {
                    return <option key={index} value="volvo" onClick={() => {
                        listaPuntiSelected.length<8 ? setListaPuntiSelected([...listaPuntiSelected, element]) : alert("numero massimo di allenamenti raggiunto")
                    }}>{element.id}</option>
                })}
            </select>
            </form>
        </div> */
    )
}

export default DropdownMenu