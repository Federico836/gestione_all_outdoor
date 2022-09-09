import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addTemplate, eliminaTemplate } from "../../../redux/actions/TemplateActions"
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { Draggable } from '@fullcalendar/interaction'
import { Button } from "@mui/material"
import styles from './TabListaTemplate.module.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AbcIcon from '@mui/icons-material/Abc';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

const TabListaTemplate = props => {
    const { setTipoEventi, rangeDateSelect, listaEventi, aggiungiTemplateCal } = props

    const [ricercaNome, setRicercaNome] = useState("")
    const [tipoOrd, setTipoOrd] = useState("data")
    const [secClickOrd, setSecClickOrd] = useState(false)
    const [nomeTemplate, setNomeTemplate] = useState("")

    const { t, i18n } = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        setSecClickOrd(false)
    }, [tipoOrd])

    const listaTemplate = useSelector(state => state.templates.lista)
    console.log(listaTemplate)
    const listaFiltrataNome = ricercaNome ==="" ? listaTemplate : listaTemplate.filter(template => template.nome.includes(ricercaNome))

    if(tipoOrd === "nome") {
        if(secClickOrd) {
            listaFiltrataNome.sort((a, b) => a.nome.localeCompare(b.nome))
        } else {
            listaFiltrataNome.sort((a, b) => b.nome.localeCompare(a.nome))
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
        let coloreRiga = "white"
        if(c%2===0) {
            coloreRiga = "lightgray"
        }

        lista.push(<tr style={{backgroundColor: coloreRiga}} className="rigaDrag" title={listaFiltrataNome[c].nomeFramework}
        sourceId={listaFiltrataNome[c].id}>
            <td>{listaFiltrataNome[c].nome}</td>
            <td>{new Date(listaFiltrataNome[c].dataCreazione).toISOString().slice(0, 10)}</td>
            <td onClick={() => aggiungiTemplateCal(listaFiltrataNome[c])}>➕</td>
            <td onClick={() => dispatch(eliminaTemplate(listaFiltrataNome[c].dbid))}>🗑️</td>
        </tr>)
    }

    /* useEffect(function addDragNDrop() {
        new Draggable(document.getElementById("tabDrag"), {
            itemSelector: '.rigaDrag',
            eventData: function(eventEl) {

                console.log(eventEl.innerText)

                const listaEventi = listaFiltrataNome.find(template => template.id==eventEl.getAttribute('sourceId')).listaEventi
                console.log(listaEventi)

                return listaEventi
            }
        })
    }, []) */

    const aggiungiTemplate = () => {
        const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
        evento.start.getTime() < rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime())

        const eventiCopiati = JSON.parse(JSON.stringify(eventiSelezionati))
        eventiCopiati.forEach(evento => {
            evento.start = new Date(evento.start)
            evento.end = evento.end ? new Date(evento.end) : null
        })

        const evento = eventiCopiati[0]
        const mezzanotteStart = new Date(new Date(evento.start).setHours(0, 0, 0, 0))
        /* const msDaMezzanotteStart = evento.start.getTime()-mezzanotteStart.getTime() */
        /* const mezzanotteEnd = evento.end ? new Date(new Date(evento.end).setHours(0, 0, 0, 0)) : null */
        /* const msDaMezzanotteEnd = evento.end ? evento.end.getTime()-mezzanotteEnd.getTime() : null */

        /* evento.start = msDaMezzanotteStart
        evento.end = msDaMezzanotteEnd */

        for(let c=0;c<eventiCopiati.length;c++) {
            const evento = eventiCopiati[c]
            evento.start = evento.start-mezzanotteStart
            evento.end = evento.end ? evento.end-mezzanotteStart : null
            evento.id = uuidv4()
        }

        dispatch(addTemplate({ nome: nomeTemplate, id: uuidv4(), dataCreazione: Date.now(), listaEventi: eventiCopiati }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerCerca}>
                
                <div style={{width: '100%'}}>
                    <TextField fullWidth id="outlined-start-adornment" size="small" onChange={e => setRicercaNome(e.target.value)} label={t('modifica-framework:cerca')}
                            sx={{ m: 0}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                                }}
                            />
                </div>
                {/* <div className={styles.cerca}>
                    {t('modifica-framework:cerca')}: <input type="text" onChange={e => setRicercaNome(e.target.value)} />
                </div> */}
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th onClick={() => {setTipoOrd("nome"); setSecClickOrd(!secClickOrd)}}>
                                {tipoOrd==="nome" ? secClickOrd ? "↓ "+t('modifica-framework:nome-template') :
                                "↑ "+t('modifica-framework:nome-template') : t('modifica-framework:nome-template')}</th>

                            <th onClick={() => {setTipoOrd("data"); setSecClickOrd(!secClickOrd)}}>
                                {tipoOrd==="data" ? secClickOrd ? "↓ "+t('modifica-framework:data-salvataggio') :
                                "↑ "+t('modifica-framework:data-salvataggio') : t('modifica-framework:data-salvataggio')}</th>
                            
                            <th>{t('modifica-framework:aggiungi')}</th>

                            <th>{t('modifica-framework:elimina')}</th>
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
            <div className={styles.containerSalvaTemplate}>
            <Stack spacing={2} direction="row">
                <TextField fullWidth id="outlined-start-adornment" size="small" onChange={e => setNomeTemplate(e.target.value)} label={t('modifica-framework:nome-template')}
                        sx={{ m: 0}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><DriveFileRenameOutlineIcon/></InputAdornment>,
                            }}
                        />
                <Button variant="contained" onClick={aggiungiTemplate} endIcon={<SaveIcon/>}>{t('esporta:salva')}</Button>
            </Stack>
                {/* {t('modifica-framework:nome-template')}: <input type="text" onChange={e => setNomeTemplate(e.target.value)} /> */}
            </div>
        </div>
    )
}

export default TabListaTemplate
