import React from "react"
import { useState, useEffect } from "react"
import Button from '@mui/material/Button'
import styles from './MainContainer.module.css'
import { useTranslation } from 'react-i18next'
import ContainerFramework from "./scriviFramewrok/ContainerFramework"
import ContainerModFrame from "./modificaFramework/ContainerModFrame"
import ContainerEsporta from "./esporta/ContainerEsporta"

const axios = require('axios')

const MainContainer = () => {

    const [pagina, setPagina] = useState("menu_princ")
    const [utente, setUtente] = useState(null)

    const { t, i18n } = useTranslation()

    useEffect(function getUtente() {
        const url_str = window.location.href
        const url = new URL(url_str)
        const search_params = url.searchParams
        const idUtente = search_params.get('id_utente')
        axios.get("https://www.magneticdays.com/api/md/get_utente/?id_utente="+idUtente).then(res => {
            setUtente(res.data.utente[0])
            setPagina("esporta")
        }).catch(err => console.log(err))
    }, [])

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
                <ContainerEsporta setPagina={setPagina} utente={utente} />}
        </div>
    )
}

export default MainContainer