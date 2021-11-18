import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from "@mui/material"

import { uploadFiles } from '../../../utils/funzioni'

const BtnCaricaFile = (props) => {

    const { t, i18n } = useTranslation()

    return (
        <div style={{marginLeft: "1vw"}}>
            <input accept=".pdf" style={{ display: 'none' }} id="raised-button-file" multiple type="file"
            onChange={e => uploadFiles(e.target.files)}/>
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">{t('esporta:carica')}</Button>
            </label>
        </div>
    )
}

export default BtnCaricaFile