import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from "@mui/material"

import { uploadFiles } from '../../../utils/funzioni'

const BtnCaricaFile = props => {
    const { testo } = props

    const { t, i18n } = useTranslation()

    return (
        <div>
            <input accept=".pdf" style={{ display: 'none' }} id="raised-button-file" multiple type="file"
            onChange={e => uploadFiles(e.target.files)}/>
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" style={{height: "100%"}}>{t('esporta:carica')} {testo}</Button>
            </label>
        </div>
    )
}

export default BtnCaricaFile