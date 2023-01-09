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
import Stack from "@mui/material/Stack"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { saveAs } from 'file-saver';
import { PDFDownloadLink} from '@react-pdf/renderer';
import PDFit from '../PDFit'
import PDFTable from '../PDFFIT/Table'
 //'../../mdwifi/services/Transforms'

const TabListaFrameworksMD = (props) => {

    const listaFrameworks = useSelector(state => state.mdFrameworks.lista)
    const { setTipoEventi,idUtente,ftp,hr,utente } = props
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

    const [ricercaNome, setRicercaNome] = useState("")
    const [watt,setWatt] = useState(null)
    const [rpm,setRpm] = useState(null)
    const [accaerre,setAccaerre] = useState(null)

    const listaFrameworksFiltrata = (ricercaNome.length < 1) ? listaFrameworks : listaFrameworks.filter(el => el.nome.toLowerCase().includes(ricercaNome.toLowerCase()))

    

    const downloadFit = (framework) => {


        console.log({framework})
        /* const arrst_framework = transformers.transformJsonFrameworkToCsv(Workout, frameworkSteps);
        var blob = new Blob([["WORKOUT","Watt Rif.","Rpm Rif."," "," ",...arrst_framework].join("\r\n")], {type: "text/csv"});
        const nome = 'Workout_' + new Date().toISOString().split('.')[0].replaceAll(':','') + '.csv'
        saveAs(blob,nome); */
        
      }

    const lista = []
    for(let c=0;c<listaFrameworksFiltrata.length;c++) {
        let coloreRiga = (c%2===0) ? "white" : "lightgray"
        
        lista.push(<tr style={{backgroundColor: (listaFrameworksFiltrata[c].uploaded) ? '#00c291' :  listaFrameworksFiltrata[c].upload_error ? '#e63702' : coloreRiga}} className="rigaDrag" title={listaFrameworksFiltrata[c].nome}
        tipoSport={"ciclismo"} sourceId={listaFrameworksFiltrata[c].id}>
            <td>{listaFrameworksFiltrata[c].nome}</td>
            <td><IconButton onClick={() => dispatch({type: "UPLOAD_FIT_TO_GARMIN", payload: {framework: listaFrameworksFiltrata[c], user_id: idUtente, ftp,hr}})}><UploadFileIcon/></IconButton></td>
            {(window.md.logged_user.ID === 345 || window.md.logged_user.ID === 108 || window.md.logged_user.ID === 957) && <td>
            <PDFDownloadLink document={<PDFTable id={listaFrameworksFiltrata[c].id} 
                                                 rif={{watt,rpm,accaerre}}/>} 
                                                 fileName={(utente) ? utente.nome || '' + "_" + utente.cognome || '' + "_FIT_" + new Date().toLocaleDateString().replace('/','-').replace('/','-') + '.pdf'
                                                 : "FIT_" + new Date().toLocaleDateString().replace('/','-').replace('/','-') + '.pdf'}>
      
      
      {({ blob, url, loading, error }) =>
        loading ? 'Aspetta...' : 'SCARICA PDF'
      }
    </PDFDownloadLink>
            </td>}

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
            <div style={{marginBottom: '20px'}}>
            <Stack direction={'row'} spacing={2}>
                    <TextField size="small" label="Watt" value={watt} onChange={(e) => {setWatt(e.target.value)}}/>
                    <TextField size="small" label="Rpm" value={rpm} onChange={(e) => {setRpm(e.target.value)}}/>
                    <TextField size="small" label="Hr" value={accaerre} onChange={(e) => {setAccaerre(e.target.value)}}/>
            </Stack>
            </div>
            <div className={styles.containerIntestTab}>
                <table className={styles.intestazioneTab}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Upload</th>
                            {(window.md.logged_user.ID === 345 || window.md.logged_user.ID === 108 || window.md.logged_user.ID === 957) && <th>PDF</th>}
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