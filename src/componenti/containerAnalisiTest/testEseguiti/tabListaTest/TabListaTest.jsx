import React from "react"
import { useTranslation } from 'react-i18next'
import api from "../../../../api/index"

const TabListaTest = props => {

    const { listaTest, setListaTest, setTestEseguiti } = props

    const { t, i18n } = useTranslation()

    const eliminaTest = async testId => {
        const res = await api.deleteTest(testId)
        if(res) setListaTest(listaTest.filter(test => test.id!==testId))
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('scrivi-framework:ciclismo:nome-framework')}</th>
                        <th>{t('scrivi-framework:ciclismo:data')}</th>
                        <th>{t('scrivi-framework:ciclismo:modifica')}</th>
                        <th>{t('scrivi-framework:ciclismo:elimina')}</th>
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
                            <td onClick={() => setTestEseguiti(riga)}>✎</td>
                            <td onClick={() => eliminaTest(riga.id)}>🗑</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TabListaTest

