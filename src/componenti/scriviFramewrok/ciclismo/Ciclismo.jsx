import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import styles from './Ciclismo.module.css'

import TabCiclismoAddRiga from './TabCiclismoAddRiga.jsx'
import TabCiclismoDragNDrop from './TabCiclismoDragNDrop.jsx'
import { v4 as uuidv4 } from 'uuid'
import { calcola7Zone } from '../../../utils/funzioni'
import Intestazione from "./Intestazione.jsx"

const Ciclismo = () => {

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: "", serie: "", ripetizioni: "", durata: "00:00:00", recupero: "", rpm: "", note: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [data, setData] = useState("")

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
            if(riga.zona>=1 && riga.zona<=7) {
                setListaRighe([...listaRighe, {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                    fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max, idRiga: uuidv4()}])
            }
        }
    }

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    console.log({zoneCalcolate})

    return (
        <div className={styles.container}>
            <Intestazione ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} setData={setData} />
            <TabCiclismoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />
            <TabCiclismoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />
        </div>
    )
}

export default Ciclismo