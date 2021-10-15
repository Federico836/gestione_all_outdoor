import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button'
import styles from './MainContainer.module.css'
import { useTranslation } from 'react-i18next'
import ContainerFramework from "./scriviFramewrok/ContainerFramework"
import ContainerModFrame from "./modificaFramework/ContainerModFrame"

const MainContainer = () => {

    const [pagina, setPagina] = useState("menu_princ")

    const { t, i18n } = useTranslation()

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
            console.log(3)}
        </div>
    )
}

export default MainContainer