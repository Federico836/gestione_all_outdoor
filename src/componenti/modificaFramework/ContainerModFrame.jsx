import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import TabSelectSport from './tabelle/TabSelectSport'
import TabListaFramework from "./tabelle/TabListaFramework"

import ContainerTabModifica from "./tabelleModifica/ContainerTabModifica"

import styles from './ContainerModFrame.module.css'

const oggettoVuoto = oggetto => {
    if(oggetto.hasOwnProperty("id")) {
        return false
    }
    return true
}

const ContainerModFrame = props => {
    const { setPagina, utente } = props

    const [modificaFrame, setModificaFrame] = useState({})
    const [tipoSport, setTipoSport] = useState("tutti")

    const { t, i18n } = useTranslation()

    return (
        <div>
            {oggettoVuoto(modificaFrame) ?
            <div className={styles.container}>
                <div className={styles.bottoneIndietro}>
                    <Button variant="contained" onClick={() => setPagina("scrivi")}>{t('main-container:scrivi')}</Button>
                    <div>{t('modifica-framework:modifica-framework')}</div>
                    {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
                </div>
                <div className={styles.containerGrid}>
                    <div>
                        <TabSelectSport setTipoSport={setTipoSport} />
                    </div>
                    <div>
                        <TabListaFramework tipoSport={tipoSport} setModificaFrame={setModificaFrame} />
                    </div>
                </div>
            </div> :
            <ContainerTabModifica modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} />}
        </div>
    )
}

export default ContainerModFrame
