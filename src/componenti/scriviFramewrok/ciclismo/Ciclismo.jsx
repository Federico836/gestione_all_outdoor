import React from "react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import styles from './Ciclismo.module.css'

import TabCiclismoAddRiga from './TabCiclismoAddRiga.jsx'
import TabCiclismoDragNDrop from './TabCiclismoDragNDrop.jsx'
import { v4 as uuidv4 } from 'uuid'

const Ciclismo = () => {

    const [listaRighe, setListaRighe] = useState([])
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)

    const { t, i18n } = useTranslation()

    const aggiungiRiga = (riga) => {
        setListaRighe([...listaRighe, {...riga, watt: ftp, fc: fc, idRiga: uuidv4()}])
    }

    return (
        <div className={styles.container}>
            <TabCiclismoAddRiga aggiungiRiga={aggiungiRiga} />
            <TabCiclismoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} />
        </div>
    )
}

export default Ciclismo