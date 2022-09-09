import React from "react"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { Draggable } from '@fullcalendar/interaction'
import { Button } from "@mui/material"
import styles from './TabListaWorkoutsMD.module.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const TabListaWorkoutsMD = (props) => {

    const listaFrameworks = useSelector(state => state.mdWorkouts.lista)
    const { setTipoEventi } = props
    const { t, i18n } = useTranslation()
    const [ricercaNome, setRicercaNome] = useState("")
    

    const lista = []
    const listaFrameworksFiltrata = (ricercaNome.length < 1) ? listaFrameworks : listaFrameworks.filter(el => el.nome.toLowerCase().includes(ricercaNome.toLowerCase()))
    for(let c=0;c<listaFrameworksFiltrata.length;c++) { 
        let coloreRiga = (c%2===0) ? "white" : "lightgray"
        
        lista.push(<tr style={{backgroundColor: coloreRiga}} className="rigaDrag" title={listaFrameworksFiltrata[c].nome}
        tipoSport={"ciclismo"} sourceId={listaFrameworksFiltrata[c].id}>
            <td>{listaFrameworksFiltrata[c].nome}</td>
        </tr>)
    }


    useEffect(function addDragNDrop() {
        new Draggable(document.getElementById("tabDrag"), {
            itemSelector: '.rigaDrag',
            eventData: function(eventEl) {

                console.log(eventEl.innerText)
                let titolo = eventEl.getAttribute('title')
                let colore = "red"
                
                return {
                    title: titolo,
                    color: colore,
                    create: true,
                    sourceId: eventEl.getAttribute('sourceId'),
                    mdId: eventEl.getAttribute('sourceId'),
                    mdType: 'W_FIT',
                    id: uuidv4()
                }
            }
        })
    }, [])

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
                {/* <div style={{marginBottom: '10px'}}>
                    <nobr>
                        <Button variant="contained" style={{marginRight: '10px'}} onClick={() => setTipoEventi("template")}>Templates</Button>
                        <Button variant="contained" style={{marginRight: '10px'}} onClick={() => setTipoEventi("framework")}>Frameworks</Button>
                    </nobr>
                </div> */}
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th>Nome</th>
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

export default TabListaWorkoutsMD