import React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Button from '@mui/material/Button'
import styles from './MainContainer.module.css'
import { useTranslation } from 'react-i18next'
import ContainerFramework from "./scriviFramewrok/ContainerFramework"
import ContainerModFrame from "./modificaFramework/ContainerModFrame"
import ContainerEsporta from "./esporta/ContainerEsporta"
import ContainerAnalisiTest from "./containerAnalisiTest/ContainerAnalisiTest"
import ContainerComparaTest from "./containerComparaTest/ContainerComparaTest"

import { getSoglia } from "../redux/actions/SogliaActions"

const axios = require('axios')

const MainContainer = props => {
    const { idUtente } = props

    const dispatch = useDispatch()

    const [pagina, setPagina] = useState("menu_princ")
    const [utente, setUtente] = useState(null)
    const [nonAbilitato, setNonAbilitato] = useState("")

    const { t, i18n } = useTranslation()

    useEffect(function getUtente() {
        if(idUtente) {
            axios.get("https://www.magneticdays.com/api/md/get_utente/?id_utente="+idUtente).then(res => {
                setUtente(res.data.utente[0])
            }).catch(err => console.log(err))
        }
    }, [])

    useEffect(function getSogliaUtente() {
        if(utente) {
            dispatch(getSoglia(utente.id_utente))
            setTimeout(() => setPagina("esporta"), 1000)
        } else {
            setTimeout(() => setNonAbilitato(t('main-container:utente-non-abilitato')), 3000)
        }
    }, [utente])

    /* useEffect(function getSogliaUtente() {
        if(utente) {
            dispatch(getSoglia(utente.id_utente))
            setPagina("esporta")
        } else {
            setTimeout(() => setNonAbilitato(t('main-container:utente-non-abilitato')), 3000)
        }
    }, [utente]) */

    window.md = {
        logged_user: {ID: 345, nome: "Allena", cognome: "Tore", roles: ['allenatore']},
        numDopoVirgola: 1
    }
    const ruoloLoggedUser = window.md.logged_user.roles[0]

    /* window.md = {numDopoVirgola: 1} */

    return (
        <div>
            {pagina==="menu_princ" ?
                <div className={styles.container}>
                    {ruoloLoggedUser==="allenatore" ? 
                    <>
                        <div className={styles.containerBottoni}>
                            <Button variant="contained" onClick={() => setPagina("scrivi_frame")}>
                                {t('main-container:scrivi-framework')}</Button>

                            <Button variant="contained" onClick={() => setPagina("modifica_frame")}>
                                {t('main-container:modifica-framework')}</Button>

                            <Button variant="contained" onClick={() => setPagina("esporta")}>{t('main-container:esporta')}</Button>
                        </div>
                        <div className={styles.containerBottoni}>
                            <Button variant="contained" onClick={() => setPagina("analisi_test")}>TEST</Button>
                            <Button variant="contained" onClick={() => setPagina("compara_test")}>{t('analisi-test:compara')} TEST</Button>
                        </div>
                    </> : nonAbilitato}
                </div> :
            pagina==="scrivi_frame" ?
                <ContainerFramework setPagina={setPagina} utente={utente} /> :
            pagina==="modifica_frame" ?
                <ContainerModFrame setPagina={setPagina} utente={utente} /> :
            pagina==="esporta" ?
                <ContainerEsporta setPagina={setPagina} utente={utente} idUtente={idUtente} ruoloLoggedUser={ruoloLoggedUser} /> :
            pagina==="analisi_test" ?
                <ContainerAnalisiTest setPagina={setPagina} utente={utente} /> :
            pagina==="compara_test" ?
                <ContainerComparaTest setPagina={setPagina} utente={utente} /> : null}
        </div>
    )
}

export default MainContainer