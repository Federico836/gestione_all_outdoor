import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabCorsaAddRiga from './tabelle/TabCorsaAddRiga.jsx'
import TabCorsaDragNDrop from './tabelle/TabCorsaDragNDrop.jsx'
import { calcolaZoneCorsa, getSecondsFromHHMMSS, toHHMMSS } from '../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Corsa.module.css'

const Corsa = () => {

    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: {zona: 1, descrizione: t('scrivi-framework:corsa:zone:recupero-attivo'), min: 0, max: 0},
        serie: "", ripetizioni: "", distanza: "", recupero: "0:00", tempo: "0:00", passoMin: "", passoMax: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [distanza, setDistanza] = useState("")
    const [tempo, setTempo] = useState("")
    const [tempoPer1000m, setTempoPer1000m] = useState("")
    const [velocita, setVelocita] = useState("")
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")

    let velocitaKmh = velocita*3.6

    useEffect(() => {
        if(distanza!=="" && tempo!=="0:00") {
            setVelocita(distanza/getSecondsFromHHMMSS(tempo))
            setTempoPer1000m(toHHMMSS(1000/velocita))
        }
    }, [distanza, tempo])

    useEffect(() => {
        if(tempoPer1000m && distanza==="" && (tempo==="0:00" || tempo==="")) {
            setVelocita(1000/getSecondsFromHHMMSS(tempoPer1000m))
        }
    }, [tempoPer1000m])

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
                    return {...el, ...datiSingolaRiga, passoMin: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min).toFixed(2),
                        passoMax: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max).toFixed(2),
                        passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media}
                }
                return {...el}
            }))
            setModificaRiga(null)
        }
        else {
            setListaRighe([...listaRighe, {...riga, passoMin: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min).toFixed(2),
                passoMax: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max).toFixed(2),
                passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media, idRiga: uuidv4()}])
        }
    }

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaDistTempo = () => {
        setDatiSingolaRiga({...datiSingolaRiga, passoMin: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min).toFixed(2),
            passoMax: (1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max).toFixed(2),
            passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media})
    }

    useEffect(() => {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {
                return {...riga, passoMin: (1000/zoneCalcolate[riga.zona.zona-1].min).toFixed(2),
                    passoMax: (1000/zoneCalcolate[riga.zona.zona-1].max).toFixed(2),
                    passoMedia: 1000/zoneCalcolate[riga.zona.zona-1].media}
        }))
    }, [distanza, tempo])

    useEffect(() => {
        cambiaSingolaRigaDistTempo()
    }, [datiSingolaRiga.zona])

    return (
        <div className={styles.container}>

            <Intestazione distanza={distanza} setDistanza={setDistanza} tempo={tempo} setTempo={setTempo} setData={setData}
            setNomeFramework={setNomeFramework} velocitaKmh={velocitaKmh} tempoPer1000m={tempoPer1000m}
            setTempoPer1000m={setTempoPer1000m} />

            <TabCorsaAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} zoneCalcolate={zoneCalcolate} />

            <TabCorsaDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={() => {dispatch(addFramework({listaRighe, tipo: "ciclismo", dataDaFare: data,
            dataCreazione: new Date().toISOString().slice(0, 10), nomeFramework, id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
            
        </div>
    )
}

export default Corsa
