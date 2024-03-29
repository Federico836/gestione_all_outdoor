import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import TabSportAddRiga from './tabelle/TabSportAddRiga.jsx'
import TabSportDragNDrop from './tabelle/TabSportDragNDrop.jsx'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Sport.module.css'

const Sport = props => {
    const { modificaFrame, setModificaFrame, utente } = props

    const [frame, setFrame] = useState({})
    const dispatch = useDispatch()

    let trova = frame.hasOwnProperty("id") ? frame.id : modificaFrame.id
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===trova)

    const [listaRigheCopia, setListaRigheCopia] = useState([])
    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: "", serie: "", ripetizioni: "", tempoDist: "", recupero: "0:00", note: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [nomeSport, setNomeSport] = useState("")
    const [noteAll, setNoteAll] = useState("")

    const { t, i18n } = useTranslation()

    useEffect(() => {

        if(frameworkSalvato) {
            setFrame(frameworkSalvato)
            const listaRigheCopia = frameworkSalvato.listaRighe.map(riga => {return {...riga, passo: 0}})
    
            setListaRighe([...listaRigheCopia])
            setListaRigheCopia([...listaRigheCopia])
            setData(frameworkSalvato.dataDaFare)
            setNomeFramework(frameworkSalvato.nomeFramework)
            setNomeSport(frameworkSalvato.tipo)
            setNoteAll(frameworkSalvato.noteAll)
        }

    }, [frameworkSalvato])

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

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {listaRighe, tipo: nomeSport, tipoPerSelect: "altri", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework, noteAll, id: uuidv4()}
           
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {listaRighe, tipo: nomeSport, tipoPerSelect: "altri", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, noteAll, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
            if(nomeSport!==frame.tipo) return false
            if(noteAll!==frame.noteAll) return false
            if(listaRighe.length!==listaRigheCopia.length) return false

            for(let c=0;c<listaRighe.length;c++) {
                if(listaRighe[c].zona!==listaRigheCopia[c].zona) return false
                if(listaRighe[c].serie!==listaRigheCopia[c].serie) return false
                if(listaRighe[c].ripetizioni!==listaRigheCopia[c].ripetizioni) return false
                if(listaRighe[c].tempoDist!==listaRigheCopia[c].tempoDist) return false
                if(listaRighe[c].recupero!==listaRigheCopia[c].recupero) return false
                if(listaRighe[c].note!==listaRigheCopia[c].note) return false
            }
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

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
                {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
            </div>

            <Intestazione setData={setData} nomeFramework={nomeFramework} setNomeFramework={setNomeFramework}
            nomeSport={nomeSport} setNomeSport={setNomeSport} />

            <TabSportAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabSportDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.bottoniNote}>
                <div>
                    <Button variant="contained" onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
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