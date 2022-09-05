import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import TabNuotoAddRiga from './tabelle/TabNuotoAddRiga.jsx'
import TabNuotoDragNDrop from './tabelle/TabNuotoDragNDrop.jsx'
import { calcolaZoneNuoto } from '../../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Nuoto.module.css'

const Nuoto = props => {
    const { modificaFrame, setModificaFrame, utente } = props

    const [frame, setFrame] = useState({})
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    let trova = frame.hasOwnProperty("id") ? frame.id : modificaFrame.id
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===trova)

    const [listaRigheCopia, setListaRigheCopia] = useState([])
    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: {zona: "1", descrizione: "A1", min: 0, max: 0},
        serie: "", ripetizioni: "", distanza: "", recupero: "0:00", tempo: "0:00", passo: "", note: "",durationType: "TIME", intensity: "WARMUP",strokeType: "FREESTYLE",equipmentType: "NONE",calorie: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [distanza, setDistanza] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [tempoPer100m, setTempoPer100m] = useState(0)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [noteAll, setNoteAll] = useState("")

    useEffect(() => {

        if(frameworkSalvato) {
            setFrame(frameworkSalvato)
            const listaRigheCopia = frameworkSalvato.listaRighe.map(riga => {return {...riga}})
    
            setListaRighe([...listaRigheCopia])
            setListaRigheCopia([...listaRigheCopia])
            setData(frameworkSalvato.dataDaFare)
            setNomeFramework(frameworkSalvato.nomeFramework)
            setNoteAll(frameworkSalvato.noteAll)
        }

    }, [frameworkSalvato])

    const velocita = 100/tempoPer100m
    let velocitaKmh = velocita*3.6

    const zoneCalcolate = calcolaZoneNuoto(velocita)

    const aggiungiRiga = riga => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga, passo: 100/zoneCalcolate[datiSingolaRiga.zona.zona-1].perce}
                }
                return {...el}
            }))
            setModificaRiga(null)
        } else {
            setListaRighe([...listaRighe, {...riga, passo: 100/zoneCalcolate[riga.zona.zona-1].perce, idRiga: uuidv4()}])
        }
    }

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setListaRighe([])
        }
    }

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {listaRighe, tipo: t('scrivi-framework:nuoto:nuoto'), tipoPerSelect: "nuoto", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework, noteAll, id: uuidv4()}
           
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {listaRighe, tipo: t('scrivi-framework:nuoto:nuoto'), tipoPerSelect: "nuoto", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, noteAll, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
            if(noteAll!==frame.noteAll) return false
            if(listaRighe.length!==listaRigheCopia.length) return false

            for(let c=0;c<listaRighe.length;c++) {
                if(listaRighe[c].zona.zona!==listaRigheCopia[c].zona.zona) return false
                if(listaRighe[c].serie!==listaRigheCopia[c].serie) return false
                if(listaRighe[c].ripetizioni!==listaRigheCopia[c].ripetizioni) return false
                if(listaRighe[c].distanza!==listaRigheCopia[c].distanza) return false
                if(listaRighe[c].recupero!==listaRigheCopia[c].recupero) return false
                if(listaRighe[c].tempo!==listaRigheCopia[c].tempo) return false
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

    const cambiaSingolaRigaDistTempo = () => {
        setDatiSingolaRiga({...datiSingolaRiga, passo: 100/zoneCalcolate[datiSingolaRiga.zona.zona-1].perce})
    }

    useEffect(() => {
        if(listaRighe.length > 0) {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {
                return {...riga, passo: 100/zoneCalcolate[riga.zona.zona-1].perce}
            }))
        }
    }, [tempoPer100m])

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
                {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
            </div>

            <Intestazione distanza={distanza} setDistanza={setDistanza} tempo={tempo} setTempo={setTempo} setData={setData}
            nomeFramework={nomeFramework} setNomeFramework={setNomeFramework} velocitaKmh={velocitaKmh} tempoPer100m={tempoPer100m}
            setTempoPer100m={setTempoPer100m} />

            <TabNuotoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} zoneCalcolate={zoneCalcolate} />

            <TabNuotoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.scrittaRac} dangerouslySetInnerHTML={{ __html: t('scrivi-framework:nuoto:scritta-rac') }}></div>

            <div className={styles.bottoniNote}>
                <div>
                    <Button variant="contained" onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
                </div>

                <textarea value={noteAll} onChange={e => setNoteAll(e.target.value)} />
                
                <div>
                    <Button variant="contained" onClick={reset}>RESET</Button>
                </div>
                
                <div>
                    <Button variant="contained">{t('scrivi-framework:calcola')}</Button>
                </div>
            </div>

        </div>
    )
}

export default Nuoto
