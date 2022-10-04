import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    const [eventiScaricati, setEventiScaricati] = useState(false)
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
            /* setTimeout(() => setPagina("esporta"), 1000) */
        } else {
            setTimeout(() => setNonAbilitato(t('main-container:utente-non-abilitato')), 3000)
        }
    }, [utente])

    const listaEventi = useSelector(state => state.eventi.lista)
    

    useEffect(function impostaPaginaURL() {
        if(listaEventi!==null && eventiScaricati===false) {
            const pagina = new URL(window.location.href).searchParams.get('pagina')
            if(pagina) {
                setPagina(pagina)
                setEventiScaricati(true)
            }
        }
    }, [listaEventi])

    const ruoloLoggedUser = window.md.logged_user.roles[0]

    /* window.md = {numDopoVirgola: 1} */

    return (
        <div>
            {pagina==="menu_princ" ?
                <div className={styles.container}>
                    {ruoloLoggedUser==="allenatore" ? 
                    <>
                        {/* <div className={styles.containerBottoni}>
                            <Button variant="contained" onClick={() => setPagina("scrivi")}>
                                {t('main-container:scrivi-framework')}</Button>

                            <Button variant="contained" onClick={() => setPagina("modifica")}>
                                {t('main-container:modifica-framework')}</Button>

                            <Button variant="contained" onClick={() => setPagina("esporta")}>{t('main-container:esporta')}</Button>
                        </div>
                        <div className={styles.containerBottoni}>
                            <Button variant="contained" onClick={() => setPagina("analisi")}>TEST</Button>
                            <Button variant="contained" onClick={() => setPagina("compara")}>{t('analisi-test:compara')} TEST</Button>
                        </div> */}
                    </> : nonAbilitato}
                </div> :
            pagina==="scrivi" ?
                <ContainerFramework setPagina={setPagina} utente={utente} /> :
            pagina==="modifica" ?
                <ContainerModFrame setPagina={setPagina} utente={utente} /> :
            pagina==="esporta" ?
                <ContainerEsporta setPagina={setPagina} utente={utente} idUtente={idUtente} ruoloLoggedUser={ruoloLoggedUser} /> :
            pagina==="analisi" ?
                <ContainerAnalisiTest setPagina={setPagina} utente={utente} /> :
            pagina==="compara" ?
                <ContainerComparaTest setPagina={setPagina} utente={utente} /> : null}
        </div>
    )
}

export default MainContainer