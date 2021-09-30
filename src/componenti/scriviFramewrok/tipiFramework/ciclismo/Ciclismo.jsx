import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import TabCiclismoDragNDrop from './TabCiclismoDragNDrop.jsx'

const Ciclismo = () => {

    const [listaRighe, setListaRighe] = useState([])

    const { t, i18n } = useTranslation()

    return (
        <div>
            <TabCiclismoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} />
        </div>
    )
}

export default Ciclismo