import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox } from "@mui/material"

import { uploadFiles } from '../../../utils/funzioni'

const IgnoraData = props => {
    const { testo,handleClickOnButtonFitExport} = props

    const { t, i18n } = useTranslation()

    return (
        <div>
            <Button variant="contained" component="span" style={{height: "100%"}} onClick={() => {handleClickOnButtonFitExport()}}>
                {t('esporta:carica')} {testo}
            </Button>
            {/* <Checkbox />{t('esporta:ignora-data')} */}
        </div>
    )
}

export default IgnoraData