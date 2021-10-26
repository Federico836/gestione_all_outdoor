import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import TabCorsaAddRiga from './tabelle/TabCorsaAddRiga.jsx'
import TabCorsaDragNDrop from './tabelle/TabCorsaDragNDrop.jsx'
import { calcolaZoneCorsa } from '../../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Corsa.module.css'

const Corsa = props => {
    const { modificaFrame, setModificaFrame } = props

    const [frame, setFrame] = useState({})
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    let trova = frame.hasOwnProperty("id") ? frame.id : modificaFrame.id
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===trova)

    const [listaRigheCopia, setListaRigheCopia] = useState([])
    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: {zona: "1", descrizione: t('scrivi-framework:corsa:zone:recupero-attivo'), min: 0, max: 0},
        serie: "", ripetizioni: "", distanza: "", recupero: "0:00", tempo: "0:00", passoMin: "", passoMax: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [distanza, setDistanza] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [tempoPer1000m, setTempoPer1000m] = useState(0)
    const [data, setData] = useState(frameworkSalvato.dataDaFare)
    const [nomeFramework, setNomeFramework] = useState(frameworkSalvato.nomeFramework)

    useEffect(() => {

        setFrame(frameworkSalvato)
        const listaRigheCopia = frameworkSalvato.listaRighe.map(riga => {return {...riga}})

        setListaRighe([...listaRigheCopia])
        setListaRigheCopia([...listaRigheCopia])

    }, [frameworkSalvato])

    const velocita = 1000/tempoPer1000m
    let velocitaKmh = velocita*3.6

    const zoneCalcolate = calcolaZoneCorsa(velocita)
    zoneCalcolate[0].descrizione = t('scrivi-framework:corsa:zone:recupero-attivo')
    zoneCalcolate[1].descrizione = t('scrivi-framework:corsa:zone:fondo-lungo')
    zoneCalcolate[2].descrizione = t('scrivi-framework:corsa:zone:fondo-medio')
    zoneCalcolate[3].descrizione = t('scrivi-framework:corsa:zone:fondo-veloce')
    zoneCalcolate[4].descrizione = t('scrivi-framework:corsa:zone:soglia')
    zoneCalcolate[5].descrizione = "VO2MAX"

    const aggiungiRiga = riga => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga, passoMin: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min,
                        passoMax: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max,
                        passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media}
                }
                return {...el}
            }))
            setModificaRiga(null)
        } else {
            setListaRighe([...listaRighe, {...riga, passoMin: 1000/zoneCalcolate[riga.zona.zona-1].min,
                passoMax: 1000/zoneCalcolate[riga.zona.zona-1].max,
                passoMedia: 1000/zoneCalcolate[riga.zona.zona-1].media, idRiga: uuidv4()}])
        }
    }

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setListaRighe([])
        }
    }

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {listaRighe, tipo: t('scrivi-framework:corsa:corsa'), tipoPerSelect: "corsa", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework, id: uuidv4()}
           
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {listaRighe, tipo: t('scrivi-framework:corsa:corsa'), tipoPerSelect: "corsa", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
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
        setDatiSingolaRiga({...datiSingolaRiga, passoMin: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min,
            passoMax: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max,
            passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media})
    }

    useEffect(() => {
        if(listaRighe.length > 0) {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {
                return {...riga, passoMin: 1000/zoneCalcolate[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcolate[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcolate[riga.zona.zona-1].media}
        }))
        }
    }, [tempoPer1000m])

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
            </div>

            <Intestazione distanza={distanza} setDistanza={setDistanza} tempo={tempo} setTempo={setTempo} setData={setData}
            nomeFramework={nomeFramework} setNomeFramework={setNomeFramework} velocitaKmh={velocitaKmh}
            tempoPer1000m={tempoPer1000m} setTempoPer1000m={setTempoPer1000m} />

            <TabCorsaAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} zoneCalcolate={zoneCalcolate} />

            <TabCorsaDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.scrittaRac} dangerouslySetInnerHTML={{ __html: t('scrivi-framework:corsa:scritta-rac') }}></div>

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained" onClick={reset}>RESET</Button>

            <Button className={styles.bottoneInutile} variant="contained">{t('scrivi-framework:calcola')}</Button>

        </div>
    )
}

export default Corsa

