import React from "react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import styles from './Ciclismo.module.css'

import TabCiclismoAddRiga from './TabCiclismoAddRiga.jsx'
import TabCiclismoDragNDrop from './TabCiclismoDragNDrop.jsx'
import { v4 as uuidv4 } from 'uuid'

const Ciclismo = () => {

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: "", serie: "", ripetizioni: "", durata: "", recupero: "", rpm: "", note: "" })
    const [modificaRiga, setModificaRiga] = useState({modifica: false})
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)

    const { t, i18n } = useTranslation()

    const aggiungiRiga = (riga) => {
        setListaRighe([...listaRighe, {...riga, watt: ftp, fc: fc, idRiga: uuidv4()}])
    }

    return (
        <div className={styles.container}>
            <TabCiclismoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga} setDatiSingolaRiga={setDatiSingolaRiga} />
            <TabCiclismoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} />
        </div>
    )
}

export default Ciclismo