import React, { useState } from "react"
import { useTranslation } from 'react-i18next'
import styles from "./ContainerNuoto.module.css"

const ContainerNuoto = props => {
    const { setPagina, open, setOpen } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>

        </div>
    )
}

export default ContainerNuoto
