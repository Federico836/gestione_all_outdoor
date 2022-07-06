import React from 'react'
import { useState } from 'react'
import styles from './DropdownMenu.module.css'

const DropdownMenuTipoAll = (props) => {

    const { listaTipiTest, tipoAll, setTipoAll } = props

    const [mouseOver, setMouseOver] = useState(tipoAll+ " ᐁ") 

    return(
        <div className={styles.dropdown} onMouseOver={() => {setMouseOver(tipoAll+" ᐃ")}}
        onMouseOut={() => {setMouseOver(tipoAll+" ᐁ")}}>
            <button className={styles.dropbtn}>{mouseOver}</button>
            <div className={styles.dropdownContent}>
            {listaTipiTest.map((element, index) => {
                return <p key={index} onClick={() => {
                    setTipoAll(element)
                }}>{element}</p>
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

export default DropdownMenuTipoAll