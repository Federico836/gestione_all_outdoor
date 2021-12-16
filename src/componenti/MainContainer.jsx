import React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Button from '@mui/material/Button'
import styles from './MainContainer.module.css'
import { useTranslation } from 'react-i18next'
import ContainerFramework from "./scriviFramewrok/ContainerFramework"
import ContainerModFrame from "./modificaFramework/ContainerModFrame"
import ContainerEsporta from "./esporta/ContainerEsporta"

import { getSoglia } from "../redux/actions/SogliaActions"

const axios = require('axios')

const MainContainer = props => {
    const { idUtente } = props

    const dispatch = useDispatch()

    const [pagina, setPagina] = useState("menu_princ")
    const [utente, setUtente] = useState(null)

    const { t, i18n } = useTranslation()

    useEffect(function getUtente() {
        if(idUtente) {
            axios.get("https://www.magneticdays.com/api/md/get_utente/?id_utente="+idUtente).then(res => {
                setUtente(res.data.utente[0])
                setPagina("esporta")
            }).catch(err => console.log(err))
        }
    }, [])

    useEffect(function getSogliaUtente() {
        if(utente) {
            console.log(utente)
            dispatch(getSoglia(utente.id_utente))
        }
    }, [utente])

    return (
        <div>
            {pagina==="menu_princ" ?
                <div className={styles.container}>
                    <div className={styles.containerBottoni}>
                        <Button variant="contained" className={styles.bottone} onClick={() => setPagina("scrivi_frame")}>
                            {t('main-container:scrivi-framework')}</Button>

                        <Button variant="contained" className={styles.bottone} onClick={() => setPagina("modifica_frame")}>
                            {t('main-container:modifica-framework')}</Button>

                        <Button variant="contained" className={styles.bottone} onClick={() => setPagina("esporta")}>
                            {t('main-container:esporta')}</Button>
                    </div>
                </div> :
            pagina==="scrivi_frame" ?
                <ContainerFramework setPagina={setPagina} /> :
            pagina==="modifica_frame" ?
                <ContainerModFrame setPagina={setPagina} /> :
                <ContainerEsporta setPagina={setPagina} utente={utente} idUtente={idUtente} />}
        </div>
    )
}

export default MainContainer