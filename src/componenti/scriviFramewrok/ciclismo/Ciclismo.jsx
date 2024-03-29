import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework } from '../../../redux/actions/FrameworkActions.js'

import TabCiclismoAddRiga from './tabelle/TabCiclismoAddRiga.jsx'
import TabCiclismoDragNDrop from './tabelle/TabCiclismoDragNDrop.jsx'
import { calcola7Zone } from '../../../utils/funzioni'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './Ciclismo.module.css'

import AddRow from '../../ScritturaModifica/componenti/AddRow'

const Ciclismo = props => {

    const dispatch = useDispatch()

    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({zona: 1, percZona: "", serie: "1", ripetizioni: "1", recupero: "1:00",
    rpm: "", note: "", durata: "1:00", wattPerc: "", fcPerc: "", durationType: "TIME", intensity: "WARMUP", targetType: "PERCENT_HR", distanza: "", calorie: "",zonaHR: 1})
    const [modificaRiga, setModificaRiga] = useState(null)
    const [ftp, setFtp] = useState(250)
    const [fc, setFc] = useState(180)
    const [data, setData] = useState("")
    const [nomeFramework, setNomeFramework] = useState("")
    const [noteAll, setNoteAll] = useState("")

    const { t, i18n } = useTranslation()

    const zoneCalcolate = calcola7Zone(ftp, fc)

    const aggiungiRiga = riga => {
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

    useEffect(() => {
       if(modificaRiga) setDatiSingolaRiga(modificaRiga)
    }, [modificaRiga])

    const cambiaSingolaRigaFtpFc = () => {
        setDatiSingolaRiga({...datiSingolaRiga, wattMin: zoneCalcolate[datiSingolaRiga.zona-1].watt_min, wattMax: zoneCalcolate[datiSingolaRiga.zona-1].watt_max,
            fcMin: zoneCalcolate[datiSingolaRiga.zona-1].fc_min, fcMax: zoneCalcolate[datiSingolaRiga.zona-1].fc_max,
            wattPerc: Math.round(ftp*(datiSingolaRiga.percZona/100)), fcPerc: Math.round(fc*(datiSingolaRiga.percZona/100)) })
    }

    useEffect(() => {
        cambiaSingolaRigaFtpFc()
        setListaRighe(listaRighe.map(riga => {
            return {...riga, wattMin: zoneCalcolate[riga.zona-1].watt_min, wattMax: zoneCalcolate[riga.zona-1].watt_max,
                fcMin: zoneCalcolate[riga.zona-1].fc_min, fcMax: zoneCalcolate[riga.zona-1].fc_max,
                wattPerc: Math.round(ftp*(riga.percZona/100)), fcPerc: Math.round(fc*(riga.percZona/100))}
        }))
    }, [ftp, fc])

    useEffect(() => {
        cambiaSingolaRigaFtpFc()
    }, [datiSingolaRiga.zona, datiSingolaRiga.percZona])

    console.log(datiSingolaRiga)

    const salvaFramework = () => {
        dispatch(addFramework({listaRighe: listaRighe.map(riga => {return {...riga, wattMin: 0, wattMax: 0, fcMin: 0, fcMax: 0}}),
        tipo: t('scrivi-framework:ciclismo:ciclismo'), tipoPerSelect: "ciclismo", dataDaFare: data,
        dataCreazione: Date.now(), nomeFramework, noteAll, id: uuidv4()}))
    }

    return (
        <div className={styles.container}>
            <Intestazione ftp={ftp} setFtp={setFtp} fc={fc} setFc={setFc} setData={setData} setNomeFramework={setNomeFramework} />

            <TabCiclismoAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            {/* <AddRow aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} /> */}

            <TabCiclismoDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
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

