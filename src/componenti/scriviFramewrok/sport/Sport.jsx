import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabSportAddRiga from './tabelle/TabSportAddRiga.jsx'
import TabSportDragNDrop from './tabelle/TabSportDragNDrop.jsx'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Sport.module.css'

const Sport = () => {

    const dispatch = useDispatch()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: "", serie: "", ripetizioni: "", tempoDist: "", recupero: "0:00", note: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [nomeSport, setNomeSport] = useState("")
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

            <Intestazione setData={setData} setNomeFramework={setNomeFramework} nomeSport={nomeSport} setNomeSport={setNomeSport} />

            <TabSportAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabSportDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.bottoniNote}>
                <div>
                    <Button variant="contained"
                    onClick={() => {dispatch(addFramework({listaRighe, tipo: nomeSport, tipoPerSelect: "altri", dataDaFare: data,
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

export default Sport