import React from "react"
import { useState } from "react"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styles from './TabListaFramework.module.css'

const TabListaFramework =props => {
    const { tipoSport } = props

    const [ricercaNome, setRicercaNome] = useState("")

    const { t, i18n } = useTranslation()

    const listaFramework = useSelector(state => state.frameworks.lista)
    const listaFiltrataTipo = tipoSport==="tutti" ? listaFramework : listaFramework.filter(frame => frame.tipoPerSelect===tipoSport)
    const listaFiltrataNome = ricercaNome==="" ? listaFiltrataTipo : listaFiltrataTipo.filter(frame => frame.nomeFramework.includes(ricercaNome))

    const lista = []
    for(let c=0;c<listaFiltrataNome.length;c++) {
        let coloreRiga = "white"
        if(c%2===0) {
            coloreRiga = "lightgray"
        }

        lista.push(<tr style={{backgroundColor: coloreRiga}}>
            <td>{listaFiltrataNome[c].tipo}</td>
            <td>{listaFiltrataNome[c].nomeFramework}</td>
            <td>{new Date(listaFiltrataNome[c].dataCreazione).toISOString().slice(0, 10)}</td>
            <td>🖉</td>
        </tr>)
    }

    return (
        <div>
            <div className={styles.cerca}>
                {t('modifica-framework:cerca')}: <input type="text" onChange={e => setRicercaNome(e.target.value)} />
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th>Sport</th>
                            <th>{t('modifica-framework:nome-framework')}</th>
                            <th>{t('modifica-framework:data-salvataggio')}</th>
                            <th>{t('modifica-framework:modifica')}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={styles.containerTab}>
                <table className={styles.tabListaFramework}>
                    <tbody>
                        {lista}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabListaFramework