import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabCorsaAddRiga from './tabelle/TabCorsaAddRiga.jsx'
import TabCorsaDragNDrop from './tabelle/TabCorsaDragNDrop.jsx'
import { calcola7Zone } from '../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Corsa.module.css'

const Corsa = () => {

    const dispatch = useDispatch()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: 1, serie: "", ripetizioni: "", distanza: "", recupero: "0:00", passo: "", note: "", durata: "0:00", distanza: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [data, setData] = useState("")

    console.log(datiSingolaRiga.durata)

    const { t, i18n } = useTranslation()

    const zoneCalcolate = calcola7Zone(ftp, fc)

    const aggiungiRiga = (riga) => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga, wattMin: zoneCalcolate[datiSingolaRiga.zona-1].watt_min, wattMax: zoneCalcolate[datiSingolaRiga.zona-1].watt_max,
                        fcMin: zoneCalcolate[datiSingolaRiga.zona-1].fc_min, fcMax: zoneCalcolate[datiSingolaRiga.zona-1].fc_max}
                }
                return {...el}
            }))
            setModificaRiga(null)
        }
        else {
            /* if(riga.zona>=1 && riga.zona<=7) { */
                setListaRighe([...listaRighe, {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                    fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max, idRiga: uuidv4()}])
            /* } */
        }
    }

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaFtpFc = () => {
        setDatiSingolaRiga({...datiSingolaRiga, wattMin: zoneCalcolate[datiSingolaRiga.zona-1].watt_min, wattMax: zoneCalcolate[datiSingolaRiga.zona-1].watt_max,
            fcMin: zoneCalcolate[datiSingolaRiga.zona-1].fc_min, fcMax: zoneCalcolate[datiSingolaRiga.zona-1].fc_max})
    }

    useEffect(() => {
        cambiaSingolaRigaFtpFc()
        setListaRighe(listaRighe.map(riga => {
            return {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max}
        }))
    }, [ftp, fc])

    useEffect(() => {
        cambiaSingolaRigaFtpFc()
    }, [datiSingolaRiga.zona])

    return (
        <div className={styles.container}>

            <Intestazione ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} setData={setData} />

            <TabCorsaAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabCorsaDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={() => {dispatch(addFramework({listaRighe, tipo: "ciclismo", dataDaFare: data,
            dataCreazione: new Date().toISOString().slice(0, 10), id: uuidv4()}))}}>{t('scrivi-framework:salva')}</Button>
            
        </div>
    )
}

export default Corsa