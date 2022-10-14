import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabCorsaAddRiga from './tabelle/TabCorsaAddRiga.jsx'
import TabCorsaDragNDrop from './tabelle/TabCorsaDragNDrop.jsx'
import { calcolaZoneCorsa,calcolaZoneCorsaAgg } from '../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Corsa.module.css'

const Corsa = () => {

    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: {zona: 1, descrizione: t('scrivi-framework:corsa:zone-2:fondo-lento-recupero'), min: 0, max: 0},
        serie: "1", ripetizioni: "", distanza: "", 
        recupero: "0:00", tempo: "0:00", passoMin: "", 
        passoMax: "", note: "",
        durationType: "TIME", intensity: "WARMUP", targetType: "PERCENT_HR", 
        calorie: "", perce_vp: "", vp: "", perce_fc: "",fc: "",zonaHR: 1})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [distanza, setDistanza] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [tempoPer1000m, setTempoPer1000m] = useState(0)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [noteAll, setNoteAll] = useState("")
    const [hr,setHr] = useState(0)

    const velocita = 1000/tempoPer1000m
    let velocitaKmh = velocita*3.6
    
   /* 
   
    t('scrivi-framework:corsa:zone-2:fondo-lento-recupero')
    t('scrivi-framework:corsa:zone-2:fondo-lento')
    t('scrivi-framework:corsa:zone-2:fondo-medio')
    t('scrivi-framework:corsa:zone-2:ritmo-gara')
    t('scrivi-framework:corsa:zone-2:fondo-veloce')
    t('scrivi-framework:corsa:zone-2:soglia')
    t("scrivi-framework:corsa:zone-2:vo2")
    t("scrivi-framework:corsa:zone-2:sprint")
    t("scrivi-framework:corsa:zone-2:recupero-passivo")
   
   */

    const zoneCalcolate = calcolaZoneCorsaAgg(velocita)
    zoneCalcolate[0].descrizione = t('scrivi-framework:corsa:zone-2:fondo-lento-recupero')
    zoneCalcolate[1].descrizione = t('scrivi-framework:corsa:zone-2:fondo-lento')
    zoneCalcolate[2].descrizione = t('scrivi-framework:corsa:zone-2:fondo-medio')
    zoneCalcolate[3].descrizione = t('scrivi-framework:corsa:zone-2:ritmo-gara')
    zoneCalcolate[4].descrizione = t('scrivi-framework:corsa:zone-2:fondo-veloce')
    zoneCalcolate[5].descrizione = t('scrivi-framework:corsa:zone-2:soglia')
    zoneCalcolate[6].descrizione = t("scrivi-framework:corsa:zone-2:vo2")
    zoneCalcolate[7].descrizione = t("scrivi-framework:corsa:zone-2:sprint")
    zoneCalcolate[8].descrizione = t("scrivi-framework:corsa:zone-2:recupero-passivo")

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

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaDistTempo = () => {
        
        setDatiSingolaRiga({...datiSingolaRiga, passoMin: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].min,
            passoMax: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].max,
            passoMedia: 1000/zoneCalcolate[datiSingolaRiga.zona.zona-1].media,vp: Number(tempoPer1000m) + Number(tempoPer1000m)*(1 - Number(datiSingolaRiga.perce_vp)/100)})
    }

    useEffect(() => {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {
                return {...riga, passoMin: 1000/zoneCalcolate[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcolate[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcolate[riga.zona.zona-1].media,vp: (1000/(Number(riga.perce_vp)/100)*velocita)}
        }))
    }, [tempoPer1000m])

    useEffect(() => {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {

                if(riga.targetType === "PERCENT_HR") {
                    return {...riga, fc: Math.round((Number(riga.perce_fc)/100)*Number(hr))}
                }

                return {...riga}
                
        }))
    }, [hr])

    useEffect(() => {
        cambiaSingolaRigaDistTempo()
    }, [datiSingolaRiga.zona])

    const salvaFramework = () => {
        dispatch(addFramework({listaRighe: listaRighe.map(riga => {return {...riga, passoMin: 0, passoMax: 0, passoMedia: 0}}),
        tipo: t('scrivi-framework:corsa:corsa'), tipoPerSelect: "corsa", dataDaFare: data, dataCreazione: Date.now(),
        nomeFramework, noteAll, id: uuidv4()}))
    }

    return (
        <div className={styles.container}>

            <Intestazione distanza={distanza} setDistanza={setDistanza} tempo={tempo} setTempo={setTempo} setData={setData}
            setNomeFramework={setNomeFramework} velocitaKmh={velocitaKmh} tempoPer1000m={tempoPer1000m}
            setTempoPer1000m={setTempoPer1000m} hr={hr} setHr={setHr}/>

            <TabCorsaAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} zoneCalcolate={zoneCalcolate} />

            <TabCorsaDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.scrittaRac} dangerouslySetInnerHTML={{ __html: t('scrivi-framework:corsa:scritta-rac') }}></div>

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

export default Corsa
