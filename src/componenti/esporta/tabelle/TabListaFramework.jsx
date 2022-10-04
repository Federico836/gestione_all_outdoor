import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from '@fullcalendar/interaction'
import { Button } from "@mui/material"
import styles from './TabListaFramework.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const TabListaFramework = props => {
    const { setTipoEventi,idUtente } = props

    const [tipoSport, setTipoSport] = useState("tutti")
    const [ricercaNome, setRicercaNome] = useState("")
    const [tipoOrd, setTipoOrd] = useState("tipo")
    const [secClickOrd, setSecClickOrd] = useState(false)
    const [uploadConfirmOpen,setUploadConfirmOpen] = useState(false)

    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
        setSecClickOrd(false)
    }, [tipoOrd])

    

    const listaFramework = useSelector(state => state.frameworks.lista)
    const listaFiltrataTipo = tipoSport==="tutti" ? listaFramework : listaFramework.filter(frame => frame.tipoPerSelect===tipoSport)
    const listaFiltrataNome = ricercaNome ==="" ? listaFiltrataTipo : listaFiltrataTipo.filter(frame => frame.nomeFramework.includes(ricercaNome))


    /* useEffect(() => {
        if(listaFramework.filter(el => el.uploaded).length > 0) {
            setUploadConfirmOpen(true)
        }
    },[listaFramework]) */

    

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

        lista.push(<tr style={{backgroundColor: (listaFiltrataNome[c].uploaded) ? '#00c291' : coloreRiga}} className="rigaDrag" title={listaFiltrataNome[c].nomeFramework}
        tipoSport={listaFiltrataNome[c].tipoPerSelect} sourceId={listaFiltrataNome[c].id}>
            <td>{listaFiltrataNome[c].tipo}</td>
            <td>{listaFiltrataNome[c].nomeFramework}</td>
            <td>{new Date(listaFiltrataNome[c].dataCreazione).toISOString().slice(0, 10)}</td>
            <td>{listaFiltrataNome[c].dataDaFare}</td>
            <td>{(listaFiltrataNome[c].tipoPerSelect === "ciclismo" || listaFiltrataNome[c].tipoPerSelect === "corsa") && 
            <IconButton disabled={listaFiltrataNome[c].uploaded} onClick={() => dispatch({type: "UPLOAD_FRAMEWORK_TO_GARMIN", payload: {framework: listaFiltrataNome[c], user_id: idUtente}})}><UploadFileIcon/></IconButton>}</td>
        </tr>)
    }

    lista.unshift(<tr style={{backgroundColor: "lightgray"}} className="rigaDrag" title="MagneticDays"
    tipoSport="rullo" sourceId={999}>
        <td>{"MagneticDays"}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>)

    useEffect(function addDragNDrop() {
        new Draggable(document.getElementById("tabDrag"), {
            itemSelector: '.rigaDrag',
            eventData: function(eventEl) {

                //console.log(eventEl.innerText)
                let titolo = ""
                let colore = ""
                if(eventEl.getAttribute('tipoSport')==="ciclismo") {
                    titolo = "🚲 "+eventEl.getAttribute('title')
                    colore = "green"
                } else if(eventEl.getAttribute('tipoSport')==="nuoto") {
                    titolo = "🏊 "+eventEl.getAttribute('title')
                    colore = "blue"
                } else if(eventEl.getAttribute('tipoSport')==="corsa") {
                    titolo = "🏃 "+eventEl.getAttribute('title')
                    colore = "red"
                } else if(eventEl.getAttribute('tipoSport')==="palestra") {
                    titolo = /* <FontAwesomeIcon icon={faDumbbell} /> */ "🏋 "+eventEl.getAttribute('title')
                    colore = "black"
                } else if(eventEl.getAttribute('tipoSport')==="combinati_tri") {
                    titolo = "🏊🚲🏃 "+eventEl.getAttribute('title')
                    colore = "gray"
                } else if(eventEl.getAttribute('tipoSport')==="gara") {
                    titolo = "🏁 "+eventEl.getAttribute('title')
                    colore = "gray"
                } else if(eventEl.getAttribute('tipoSport')==="rullo") {
                    titolo = "𑁍 "+eventEl.getAttribute('title')
                    colore = "gray"
                } else {
                    titolo = eventEl.getAttribute('title')
                    colore = "gray"
                }

                return {
                    title: titolo,
                    color: colore,
                    create: true,
                    sourceId: eventEl.getAttribute('sourceId'),
                /*  start: 'T10:30:00', */
                    mdId: eventEl.getAttribute('sourceId'),
                    mdType: eventEl.getAttribute('tipoSport'),
                    id: uuidv4()
                }
            }
        })
    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerCerca}>
                    <div style={{marginBottom: '10px', width: '40%'}}>
                        
                            {/* <Button variant="contained" style={{marginRight: '10px'}}
                                onClick={() => setTipoEventi("template")}>Framework</Button>
                            <Button variant="contained" onClick={() => setTipoEventi("fit")} style={{marginRight: '10px'}}>FIT</Button> */}
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tipoSport}
                                label="Sport"
                                onChange={e => setTipoSport(e.target.value)}
                                fullWidth
                                >
                                    <MenuItem value="ciclismo">{t('scrivi-framework:ciclismo:ciclismo')}</MenuItem>
                                    <MenuItem value="corsa">{t('scrivi-framework:corsa:corsa')}</MenuItem>
                                    <MenuItem value="nuoto">{t('scrivi-framework:nuoto:nuoto')}</MenuItem>
                                    <MenuItem value="palestra">{t('scrivi-framework:palestra:palestra')}</MenuItem>
                                    <MenuItem value="combinati_tri">{t('scrivi-framework:combinati-tri:combinati-tri')}</MenuItem>
                                    <MenuItem value="altri">{t('scrivi-framework:sport:altri')}</MenuItem>
                                    <MenuItem value="tutti">{t('modifica-framework:tutti')}</MenuItem>
                                </Select>
                            </FormControl>
                        
                    </div>
                    <div>
                        <TextField id="outlined-start-adornment" size="small" onChange={e => setRicercaNome(e.target.value)} label={t('modifica-framework:cerca')}
                                sx={{ m: 0, width: '25ch' }}
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
                                <th onClick={() => {setTipoOrd("tipo"); setSecClickOrd(!secClickOrd)}}>
                                    {tipoOrd==="tipo" ? secClickOrd ? "↓ Sport" : "↑ Sport" : "Sport"}</th>

                                <th onClick={() => {setTipoOrd("nome"); setSecClickOrd(!secClickOrd)}}>
                                    {tipoOrd==="nome" ? secClickOrd ? "↓ "+t('modifica-framework:nome-framework') :
                                    "↑ "+t('modifica-framework:nome-framework') : t('modifica-framework:nome-framework')}</th>

                                <th onClick={() => {setTipoOrd("data"); setSecClickOrd(!secClickOrd)}}>
                                    {tipoOrd==="data" ? secClickOrd ? "↓ "+t('modifica-framework:data-salvataggio') :
                                    "↑ "+t('modifica-framework:data-salvataggio') : t('modifica-framework:data-salvataggio')}</th>
                                    
                                <th>{t('modifica-framework:data-da-fare')}</th>
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
        </>
    )
}

export default TabListaFramework
