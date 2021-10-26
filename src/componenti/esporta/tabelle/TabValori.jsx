import { style } from "@mui/system"
import React from "react"
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../utils/funzioni"

import styles from './TabValori.module.css'

const TabValori = props => {
    const { ftp, setFtp, fc, setFc, passoNuoto, setPassoNuoto, passoCorsa, setPassoCorsa } = props

    const onBlurPassoCorsa = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoCorsa(seconds)
    }

    const onBlurPassoNuoto = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoNuoto(seconds)
    }

    return (
        <fieldset className={styles.container}>
            <legend>valori:</legend>

            <div className={styles.containerCiclismo}>
                <div>
                    ciclismo: <input type="number" min={0} value={fc} onChange={e => setFc(e.target.value)} /> fc
                </div>
                <div>
                    <input type="number" min={0} value={ftp} onChange={e => setFtp(e.target.value)} /> ftp
                </div>
            </div>

            <div>
                corsa: ({toHHMMSS(passoCorsa)}) <input type="text" onBlur={onBlurPassoCorsa} /> passo 1000
            </div>

            <div>
                nuoto: ({toHHMMSS(passoNuoto)}) <input type="text" onBlur={onBlurPassoNuoto} /> passo 100
            </div>
        </fieldset>
    )
}

export default TabValori

