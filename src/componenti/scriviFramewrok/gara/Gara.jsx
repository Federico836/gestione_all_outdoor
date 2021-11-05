import React from "react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Gara.module.css'

const Gara = () => {

    const dispatch = useDispatch()

    const [testo, setTesto] = useState("")
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [nomeGara, setNomeGara] = useState("")

    const { t, i18n } = useTranslation()

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setTesto("")
        }
    }

    return (
        <div className={styles.container}>

            <Intestazione setData={setData} setNomeFramework={setNomeFramework} nomeGara={nomeGara} setNomeGara={setNomeGara} />

            <div>
                <textarea style={{width: "100%", height: "50vh"}} onChange={e => setTesto(e.target.value)} />
            </div>

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={() => {dispatch(addFramework({testo, tipo: nomeGara, tipoPerSelect: "gara", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework, id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained" onClick={reset}>RESET</Button>
        </div>
    )
}

export default Gara