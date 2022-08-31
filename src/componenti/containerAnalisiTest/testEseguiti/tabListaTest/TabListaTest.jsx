import React from "react"
import { useTranslation } from 'react-i18next'

const TabListaTest = props => {

    const { listaTest } = props

    const { t, i18n } = useTranslation()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('scrivi-framework:ciclismo:nome-framework')}</th>
                        <th>{t('scrivi-framework:ciclismo:data')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listaTest.map(riga => {
                        let tipoSport = ""
                        if(riga.tipoSport==="corsa") tipoSport = t('scrivi-framework:corsa:corsa')
                        else if(riga.tipoSport==="nuoto") tipoSport = t('scrivi-framework:nuoto:nuoto')

                        return <tr key={riga.id}>
                            <td>{tipoSport+" "+riga.tipoTest+" "+riga.nomeUtente+" "+riga.cognomeUtente}</td>
                            <td>{new Date(riga.data).toLocaleString()}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TabListaTest