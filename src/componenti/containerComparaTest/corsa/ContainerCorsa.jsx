import React, { useState } from "react"
import { useTranslation } from 'react-i18next'
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>

        </div>
    )
}

export default ContainerCorsa