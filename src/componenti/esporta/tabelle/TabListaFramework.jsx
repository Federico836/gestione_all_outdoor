import React from "react"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

import { Draggable } from '@fullcalendar/interaction'

import styles from './TabListaFramework.module.css'

const TabListaFramework = props => {
    const {  } = props

    const [tipoSport, setTipoSport] = useState("tutti")
    const [ricercaNome, setRicercaNome] = useState("")
    const [tipoOrd, setTipoOrd] = useState("tipo")
    const [secClickOrd, setSecClickOrd] = useState(false)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        setSecClickOrd(false)
    }, [tipoOrd])

    const listaFramework = useSelector(state => state.frameworks.lista)
    const listaFiltrataTipo = tipoSport==="tutti" ? listaFramework : listaFramework.filter(frame => frame.tipoPerSelect===tipoSport)
    const listaFiltrataNome = ricercaNome ==="" ? listaFiltrataTipo : listaFiltrataTipo.filter(frame => frame.nomeFramework.includes(ricercaNome))

    if(tipoOrd === "tipo") {
        if(secClickOrd) {
            listaFiltrataNome.sort((a, b) => a.tipo.localeCompare(b.tipo))
        } else {
            listaFiltrataNome.sort((a, b) => b.tipo.localeCompare(a.tipo))
        }
    } else if(tipoOrd === "nome") {
        if(secClickOrd) {
            listaFiltrataNome.sort((a, b) => a.nomeFramework.localeCompare(b.nomeFramework))
        } else {
            listaFiltrataNome.sort((a, b) => b.nomeFramework.localeCompare(a.nomeFramework))
        }
    } else if(tipoOrd === "data") {
        if(secClickOrd) {
            listaFiltrataNome.sort((a, b) => a.dataCreazione - b.dataCreazione)
        } else {
            listaFiltrataNome.sort((a, b) => b.dataCreazione - a.dataCreazione)
        }
    }

    const lista = []
    for(let c=0;c<listaFiltrataNome.length;c++) {
        let coloreRiga = "lightgray"
        if(c%2===0) {
            coloreRiga = "white"
        }

        lista.push(<tr style={{backgroundColor: coloreRiga}} className="rigaDrag" title={listaFiltrataNome[c].nomeFramework}
        tipoSport={listaFiltrataNome[c].tipoPerSelect} sourceId={listaFiltrataNome[c].id}>
            <td>{listaFiltrataNome[c].tipo}</td>
            <td>{listaFiltrataNome[c].nomeFramework}</td>
            <td>{new Date(listaFiltrataNome[c].dataCreazione).toISOString().slice(0, 10)}</td>
            <td>{listaFiltrataNome[c].dataDaFare}</td>
        </tr>)
    }

    lista.unshift(<tr style={{backgroundColor: "lightgray"}} className="rigaDrag" title="MagneticDays"
    tipoSport={"rullo"} sourceId={999}>
        <td>{"MagneticDays"}</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>)

    useEffect(function addDragNDrop() {
        new Draggable(document.getElementById("tabDrag"), {
            itemSelector: '.rigaDrag',
            eventData: function(eventEl) {

            console.log(eventEl.innerText)
            //const name = eventEl.getElementById('nome-frame')
            
            return {
                title: (function iconaSport() {
                    if(eventEl.getAttribute('tipoSport')==="ciclismo") {
                        return "🚲 "+eventEl.getAttribute('title')
                    } else if(eventEl.getAttribute('tipoSport')==="nuoto") {
                        return "🏊 "+eventEl.getAttribute('title')
                    } else if(eventEl.getAttribute('tipoSport')==="corsa") {
                        return "🏃 "+eventEl.getAttribute('title')
                    } else if(eventEl.getAttribute('tipoSport')==="palestra") {
                        return <FontAwesomeIcon icon={faDumbbell} />
                    } else return eventEl.getAttribute('title')
                })(),
                /* duration: '01:00', */
                color: (function iconaSport() {
                    if(eventEl.getAttribute('tipoSport')==="ciclismo") {
                        return "green"
                    } else if(eventEl.getAttribute('tipoSport')==="nuoto") {
                        return "blue"
                    } else if(eventEl.getAttribute('tipoSport')==="corsa") {
                        return "red"
                    } else if(eventEl.getAttribute('tipoSport')==="palestra") {
                        return "black"
                    } else return "gray"
                })(),
                create: true,
                sourceId: eventEl.getAttribute('sourceId'),
               /*  start: 'T10:30:00', */
                mdId: eventEl.getAttribute('sourceId'),
                id: uuidv4()
                }
            }
        })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.containerCerca}>
                <div>
                    <select onChange={e => setTipoSport(e.target.value)}>
                        <option value="ciclismo">{t('scrivi-framework:ciclismo:ciclismo')}</option>
                        <option value="corsa">{t('scrivi-framework:corsa:corsa')}</option>
                        <option value="nuoto">{t('scrivi-framework:nuoto:nuoto')}</option>
                        <option value="palestra">{t('scrivi-framework:palestra:palestra')}</option>
                        <option value="combinati_tri">{t('scrivi-framework:combinati-tri:combinati-tri')}</option>
                        <option value="altri">{t('scrivi-framework:sport:altri')}</option>
                        <option value="tutti">{t('modifica-framework:tutti')}</option>
                    </select>
                </div>
                <div className={styles.cerca}>
                    {t('modifica-framework:cerca')}: <input type="text" onChange={e => setRicercaNome(e.target.value)} />
                </div>
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th onClick={() => {setTipoOrd("tipo"); setSecClickOrd(!secClickOrd)}}>
                                {tipoOrd==="tipo" ? secClickOrd ? "↓ Sport" : "↑ Sport" : "Sport"}</th>

                            <th onClick={() => {setTipoOrd("nome"); setSecClickOrd(!secClickOrd)}}>
                                {tipoOrd==="nome" ? secClickOrd ? "↓ "+t('modifica-framework:nome-framework') :
                                "↑ "+t('modifica-framework:nome-framework') : t('modifica-framework:nome-framework')}</th>

                            <th onClick={() => {setTipoOrd("data"); setSecClickOrd(!secClickOrd)}}>
                                {tipoOrd==="data" ? secClickOrd ? "↓ "+t('modifica-framework:data-salvataggio') :
                                "↑ "+t('modifica-framework:data-salvataggio') : t('modifica-framework:data-salvataggio')}</th>
                                
                            <th>{t('modifica-framework:data-da-fare')}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={styles.containerTab}>
                <table className={styles.tabListaFramework}>
                    <tbody id="tabDrag">
                        {lista}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabListaFramework
