import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { Draggable } from '@fullcalendar/interaction'
import { Button } from "@mui/material"
import styles from './TabListaFrameworkMD.module.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';

const TabListaFrameworksMD = (props) => {

    const listaFrameworks = useSelector(state => state.mdFrameworks.lista)
    const { setTipoEventi,idUtente,ftp,hr } = props
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

    const [ricercaNome, setRicercaNome] = useState("")
    const listaFrameworksFiltrata = (ricercaNome.length < 1) ? listaFrameworks : listaFrameworks.filter(el => el.nome.toLowerCase().includes(ricercaNome.toLowerCase()))

    const lista = []
    for(let c=0;c<listaFrameworksFiltrata.length;c++) {
        let coloreRiga = (c%2===0) ? "white" : "lightgray"
        
        lista.push(<tr style={{backgroundColor: (listaFrameworksFiltrata[c].uploaded) ? '#00c291' : coloreRiga}} className="rigaDrag" title={listaFrameworksFiltrata[c].nome}
        tipoSport={"ciclismo"} sourceId={listaFrameworksFiltrata[c].id}>
            <td>{listaFrameworksFiltrata[c].nome}</td>
            <td><IconButton onClick={() => dispatch({type: "UPLOAD_FIT_TO_GARMIN", payload: {framework: listaFrameworksFiltrata[c], user_id: idUtente, ftp,hr}})}><UploadFileIcon/></IconButton></td>
        </tr>)
    }


    useEffect(function addDragNDrop() {
        new Draggable(document.getElementById("tabDrag"), {
            itemSelector: '.rigaDrag',
            eventData: function(eventEl) {

                //console.log(eventEl.innerText)
                let titolo = eventEl.getAttribute('title')
                let colore = "red"
                
                return {
                    title: titolo,
                    color: colore,
                    create: true,
                    sourceId: eventEl.getAttribute('sourceId'),
                    mdId: eventEl.getAttribute('sourceId'),
                    mdType: 'FIT',
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
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Upload</th>
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

export default TabListaFrameworksMD