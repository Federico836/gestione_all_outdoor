import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Calendario from './tabelle/Calendario'
import TabListaFramework from './tabelle/TabListaFramework'
import TabValori from './tabelle/TabValori'
import Report from './tabelle/Report'
import BtnCaricaFile from './btnCaricaFile/BtnCaricaFile'
import { useTranslation } from 'react-i18next'

import { Button, Checkbox } from "@mui/material"
import styles from './ContainerEsporta.module.css'

const ContainerEsporta = props => {
    const { setPagina, utente } = props

    const [listaEventi, setListaEventi] = useState(useSelector(state => state.eventi.lista))
    const [rangeDateSelect, setRangeDateSelect] = useState([])
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [passoCorsa, setPassoCorsa] = useState(0)
    const [passoNuoto, setPassoNuoto] = useState(0)
    const [report, setReport] = useState(false)
    const [tabellone, setTabellone] = useState(true)

    const { t, i18n } = useTranslation()

    const listaEventiStore = useSelector(state => state.eventi.lista)
    console.log(listaEventiStore)

    useEffect(() => {
        setListaEventi(listaEventiStore)
    }, [listaEventiStore])

    return (
        <div className={styles.container}>
            {report ? 
            <Report listaEventi={listaEventi} rangeDateSelect={rangeDateSelect} ftp={ftp} fc={fc} passoCorsa={passoCorsa}
            passoNuoto={passoNuoto} report={report} setReport={setReport} tabellone={tabellone} utente={utente} /> :
            <>
                <div className={styles.containerBottoniTop}>
                    <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                    {utente ? <BtnCaricaFile /> : null}
                </div>

                <div className={styles.containerGrid}>
                    <div>
                        <Calendario listaEventi={listaEventi} setListaEventi={setListaEventi} setRangeDateSelect={setRangeDateSelect} />
                    </div>
                    <div>
                        <TabListaFramework />
                    </div>
                </div>

                {utente ?
                <>
                    <TabValori ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} passoNuoto={passoNuoto} setPassoNuoto={setPassoNuoto}
                    passoCorsa={passoCorsa} setPassoCorsa={setPassoCorsa} />

                    <div className={styles.containerBottoniBottom}>
                        <Button variant="contained" onClick={() => setReport(true)}
                        disabled={rangeDateSelect.length<1 ? true : false}>REPORT</Button>
                        <Checkbox onChange={() => setTabellone(!tabellone)} checked={tabellone} />
                        <div>{t('main-container:tabella-zone')}</div>
                    </div>
                </> : null}
            </>}
        </div>
    )
}

export default ContainerEsporta
