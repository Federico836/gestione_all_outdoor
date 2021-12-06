import React from "react"
import MDImg from './MD_logo_RGB_pos.png'
import cyberTestImg from './CYBER TEST_1.png'
import { useTranslation } from 'react-i18next'

import './PrimaPaginaReport.css'

const PrimaPaginaReport = props => {
    const { dataInizio, dataFine, utente } = props

    const { t, i18n } = useTranslation()

    return (
        <div className="container-prima-pagina-report">
            <div>
                <img src={MDImg} style={{width: "25vw"}} />
            </div>
            <div style={{marginTop: "3vh"}}>
                <img src={cyberTestImg} style={{width: "35vw"}} />
            </div>
            <div style={{marginTop: "8vh"}}>
                <h1>{t('esporta:report:prima-pagina:planning-allenamenti')}</h1>
            </div>
            <div style={{marginTop: "10vh"}}>
                <h2>{t('esporta:report:prima-pagina:da')+" "+dataInizio.toLocaleDateString()+" "+
                t('esporta:report:prima-pagina:a')+" "+dataFine.toLocaleDateString()}</h2>
            </div>
            <div>
                <h2>{t('esporta:report:prima-pagina:atleta')}: {utente ? utente.nome+" "+utente.cognome : null}</h2>
            </div>
            <div>
                <h2>{t('esporta:report:prima-pagina:allenatore')}: {window.md.logged_user.nome+" "+window.md.logged_user.cognome}</h2>
            </div>
        </div>
    )
}

export default PrimaPaginaReport

