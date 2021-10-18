import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabPalestraAddRiga from './tabelle/TabPalestraAddRiga.jsx'
import TabPalestraDragNDrop from './tabelle/TabPalestraDragNDrop.jsx'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Palestra.module.css'

const Palestra = () => {

    const dispatch = useDispatch()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({esercizio: "", serie: "", ripetizioni: "", peso: "", recupero: "0:00", tut: "", note: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")

    const { t, i18n } = useTranslation()

    const aggiungiRiga = (riga) => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga}
                }
                return {...el}
            }))
            setModificaRiga(null)
        }
        else {
            setListaRighe([...listaRighe, {...riga, idRiga: uuidv4()}])
        }
    }

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setListaRighe([])
        }
    }

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    return (
        <div className={styles.container}>

            <Intestazione setData={setData} setNomeFramework={setNomeFramework} />

            <TabPalestraAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabPalestraDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={() => {dispatch(addFramework({listaRighe, tipo: "palestra", tipoPerSelect: "palestra", dataDaFare: data,
            dataCreazione: new Date().toISOString().slice(0, 10), nomeFramework, id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained"
            onClick={reset}>RESET</Button>
        </div>
    )
}

export default Palestra