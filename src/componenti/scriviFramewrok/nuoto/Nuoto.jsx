import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabNuotoAddRiga from './tabelle/TabNuotoAddRiga.jsx'
import TabNuotoDragNDrop from './tabelle/TabNuotoDragNDrop.jsx'
import { calcolaZoneNuoto } from '../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Nuoto.module.css'

const Nuoto = () => {

    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: {zona: 1, descrizione: "A1", min: 0, max: 0},
        serie: "", ripetizioni: "", distanza: "", recupero: "0:00", tempo: "0:00", passo: "", note: ""})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [distanza, setDistanza] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [tempoPer100m, setTempoPer100m] = useState(0)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")

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

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaDistTempo = () => {
        setDatiSingolaRiga({...datiSingolaRiga, passo: 100/zoneCalcolate[datiSingolaRiga.zona.zona-1].perce})
    }

    useEffect(() => {
            cambiaSingolaRigaDistTempo()
            setListaRighe(listaRighe.map(riga => {
                return {...riga, passo: 100/zoneCalcolate[riga.zona.zona-1].perce}
        }))
    }, [tempoPer100m])

    useEffect(() => {
        cambiaSingolaRigaDistTempo()
    }, [datiSingolaRiga.zona])

    return (
        <div className={styles.container}>

            <Intestazione distanza={distanza} setDistanza={setDistanza} tempo={tempo} setTempo={setTempo} setData={setData}
            setNomeFramework={setNomeFramework} velocitaKmh={velocitaKmh} tempoPer100m={tempoPer100m}
            setTempoPer100m={setTempoPer100m} />

            <TabNuotoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} zoneCalcolate={zoneCalcolate} />

            <TabNuotoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.scrittaRac} dangerouslySetInnerHTML={{ __html: t('scrivi-framework:nuoto:scritta-rac') }}></div>

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={() => {dispatch(addFramework({listaRighe: listaRighe.map(riga => {return {...riga, passo: 0}}),
            tipo: t('scrivi-framework:nuoto:nuoto'), tipoPerSelect: "nuoto", dataDaFare: data, dataCreazione: Date.now(),
            nomeFramework, id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained"
            onClick={reset}>RESET</Button>

            <Button className={styles.bottoneInutile} variant="contained">{t('scrivi-framework:calcola')}</Button>

        </div>
    )
}

export default Nuoto
