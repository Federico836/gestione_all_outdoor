import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import TabCiclismoAddRiga from './tabelle/TabCiclismoAddRiga.jsx'
import TabCiclismoDragNDrop from './tabelle/TabCiclismoDragNDrop.jsx'
import { calcola7Zone } from '../../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Ciclismo.module.css'

const Ciclismo = props => {
    const { modificaFrame, setModificaFrame } = props
    const [frame, setFrame] = useState({}) // andrea
    const dispatch = useDispatch()

    let trova = frame.hasOwnProperty("id") ? frame.id : modificaFrame.id
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===trova)
    
    const [listaRigheCopia, setListaRigheCopia] = useState([])
    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: "1", percZona: "", serie: "", ripetizioni: "", recupero: "0:00",
    rpm: "", note: "", durata: "0:00", wattPerc: "", fcPerc: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [ftp, setFtp] = useState(0)
    const [fc, setFc] = useState(0)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [noteAll, setNoteAll] = useState("")

    // andrea
    useEffect(() => {

        if(frameworkSalvato) {
            setFrame(frameworkSalvato)
            const listaRigheCopia = frameworkSalvato.listaRighe.map(riga => {return {...riga}})

            setListaRighe([...listaRigheCopia])
            setListaRigheCopia([...listaRigheCopia])
            setData(frameworkSalvato.dataDaFare)
            setNomeFramework(frameworkSalvato.nomeFramework)
            setNoteAll(frameworkSalvato.noteAll)
        }

    }, [frameworkSalvato])
    // andrea

    const { t, i18n } = useTranslation()

    const zoneCalcolate = calcola7Zone(ftp, fc)

    const aggiungiRiga = (riga) => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga, wattMin: zoneCalcolate[datiSingolaRiga.zona-1].watt_min, wattMax: zoneCalcolate[datiSingolaRiga.zona-1].watt_max,
                        fcMin: zoneCalcolate[datiSingolaRiga.zona-1].fc_min, fcMax: zoneCalcolate[datiSingolaRiga.zona-1].fc_max,
                        wattPerc: Math.round(ftp*(riga.percZona/100)), fcPerc: Math.round(fc*(riga.percZona/100))
                    }
                }
                return {...el}
            }))
            setModificaRiga(null)
        }
        else {
            setListaRighe([...listaRighe, {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max, idRiga: uuidv4(),
                wattPerc: Math.round(ftp*(riga.percZona/100)), fcPerc: Math.round(fc*(riga.percZona/100))}])
        }
    }

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setListaRighe([])
        }
    }

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {listaRighe, tipo: t('scrivi-framework:ciclismo:ciclismo'), tipoPerSelect: "ciclismo",
            dataDaFare: data, dataCreazione: Date.now(), nomeFramework, noteAll, id: uuidv4()}
            
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {listaRighe, tipo: t('scrivi-framework:ciclismo:ciclismo'), tipoPerSelect: "ciclismo",
            dataDaFare: data, dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, noteAll, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
            if(noteAll!==frame.noteAll) return false
            if(listaRighe.length!==listaRigheCopia.length) return false

            for(let c=0;c<listaRighe.length;c++) {
                if(listaRighe[c].zona!==listaRigheCopia[c].zona) return false
                if(listaRighe[c].serie!==listaRigheCopia[c].serie) return false
                if(listaRighe[c].ripetizioni!==listaRigheCopia[c].ripetizioni) return false
                if(listaRighe[c].recupero!==listaRigheCopia[c].recupero) return false
                if(listaRighe[c].rpm!==listaRigheCopia[c].rpm) return false
                if(listaRighe[c].note!==listaRigheCopia[c].note) return false
                if(listaRighe[c].durata!==listaRigheCopia[c].durata) return false
            }
            return true
        }

        if(isFrameworkUguale()) {
            setModificaFrame({})
        } else {
            if(window.confirm(t('modifica-framework:pagina-modifica:alert-cambiamenti'))) {
                setModificaFrame({})
            }
        }
    }

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaFtpFc = () => {
        setDatiSingolaRiga({...datiSingolaRiga, wattMin: zoneCalcolate[datiSingolaRiga.zona-1].watt_min, wattMax: zoneCalcolate[datiSingolaRiga.zona-1].watt_max,
            fcMin: zoneCalcolate[datiSingolaRiga.zona-1].fc_min, fcMax: zoneCalcolate[datiSingolaRiga.zona-1].fc_max,
            wattPerc: Math.round(ftp*(datiSingolaRiga.percZona/100)), fcPerc: Math.round(fc*(datiSingolaRiga.percZona/100))})
    }

    useEffect(() => {
        // andrea   if(listaRighe.length > 0)
        cambiaSingolaRigaFtpFc()
        if(listaRighe.length > 0) setListaRighe(listaRighe.map(riga => {
            return {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max,
                wattPerc: Math.round(ftp*(riga.percZona/100)), fcPerc: Math.round(fc*(riga.percZona/100))}
        }))
    }, [ftp, fc])

    useEffect(() => {
        cambiaSingolaRigaFtpFc()
    }, [datiSingolaRiga.zona, datiSingolaRiga.percZona])

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
            </div>

            <Intestazione ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} data={data} setData={setData}
            nomeFramework={nomeFramework} setNomeFramework={setNomeFramework}/>

            <TabCiclismoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabCiclismoDragNDrop listaRighe={[...listaRighe]} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <div className={styles.bottoniNote}>
                <div>
                    <Button variant="contained" onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
                </div>

                <textarea value={noteAll} onChange={e => setNoteAll(e.target.value)} />
                
                <div>
                    <Button variant="contained" onClick={reset}>RESET</Button>
                </div>
            </div>

        </div>
    )
}

export default Ciclismo
