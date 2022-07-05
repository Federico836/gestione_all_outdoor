import React, { useState } from "react"
import { useTranslation } from 'react-i18next'
import BottoniTop from "../bottoniTop/BottoniTop"
import styles from "./ContainerCorsa.module.css"

const ContainerCorsa = props => {
    const { setPagina, open, setOpen } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <BottoniTop setPagina={setPagina} open={open} setOpen={setOpen} />
        </div>
    )
}

export default ContainerCorsa