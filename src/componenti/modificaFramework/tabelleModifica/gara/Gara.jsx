import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Gara.module.css'

const Gara = props => {

    const { modificaFrame, setModificaFrame } = props
    const [frame, setFrame] = useState({}) // andrea
    const dispatch = useDispatch()

    let trova = frame.hasOwnProperty("id") ? frame.id : modificaFrame.id
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===trova)

    const [testo, setTesto] = useState("")
    const [testoCopia, setTestoCopia] = useState("")
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState(frameworkSalvato.nomeFramework)
    const [nomeGara, setNomeGara] = useState(frameworkSalvato.tipo)

    useEffect(() => {

        setFrame(frameworkSalvato)

        setTesto(frameworkSalvato.testo)
        setTestoCopia(frameworkSalvato.testo)

    }, [frameworkSalvato])

    const { t, i18n } = useTranslation()

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setTesto("")
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
            if(testo!==testoCopia) return false
            if(nomeGara!==frame.tipo) return false

            return true
        }

        if(isFrameworkUguale()) {
            setModificaFrame({})
        } else {
            if(window.confirm(t('modifica-framework:pagina-modifica:alert-cambiamenti'))) {
                setModificaFrame({})
            }
        }
    }

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {testo, tipo: nomeGara, tipoPerSelect: "gara", listaRighe: [],
            dataDaFare: data, dataCreazione: Date.now(), nomeFramework, id: uuidv4()}
            
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {testo, tipo: nomeGara, tipoPerSelect: "gara", listaRighe: [],
            dataDaFare: data, dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
            </div>

            <Intestazione setData={setData} nomeFramework={nomeFramework} setNomeFramework={setNomeFramework}
            nomeGara={nomeGara} setNomeGara={setNomeGara} />

            <div>
                <textarea style={{width: "100%", height: "50vh"}} value={testo} onChange={e => setTesto(e.target.value)} />
            </div>

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained" onClick={reset}>RESET</Button>
        </div>
    )
}

export default Gara
