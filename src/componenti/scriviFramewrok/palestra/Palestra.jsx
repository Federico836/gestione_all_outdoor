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
    const [noteAll, setNoteAll] = useState("")

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

            <div className={styles.bottoniNote}>
                <div>
                    <Button variant="contained"
                    onClick={() => {dispatch(addFramework({listaRighe, tipo: t('scrivi-framework:palestra:palestra'), tipoPerSelect: "palestra", dataDaFare: data,
                    dataCreazione: Date.now(), nomeFramework, noteAll, id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
                </div>

                <textarea value={noteAll} onChange={e => setNoteAll(e.target.value)} />
                
                <div>
                    <Button variant="contained" onClick={reset}>RESET</Button>
                </div>
            </div>

        </div>
    )
}

export default Palestra