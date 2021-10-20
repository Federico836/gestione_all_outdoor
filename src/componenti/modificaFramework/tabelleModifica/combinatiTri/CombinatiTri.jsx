import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addFramework, replaceFramework } from '../../../../redux/actions/FrameworkActions.js'

import TabCombinatiTriAddRiga from './tabelle/TabCombinatiTriAddRiga.jsx'
import TabCombinatiTriDragNDrop from './tabelle/TabCombinatiTriDragNDrop.jsx'
import Intestazione from "./tabelle/Intestazione.jsx"

import { Button } from "@mui/material"
import styles from './CombinatiTri.module.css'

const CombinatiTri = props => {
    const { modificaFrame, setModificaFrame } = props

    const [frame, setFrame] = useState({})

    const dispatch = useDispatch()
    const frameworkSalvato = useSelector(state => state.frameworks.lista).find(frame => frame.id===modificaFrame.id)

    const [listaRigheCopia, setListaRigheCopia] = useState([])
    const [listaRighe, setListaRighe] = useState([])
    const [datiSingolaRiga, setDatiSingolaRiga] = useState({sport: "", zona: "", serie: "", ripetizioni: "", tempoDist: "", passo: "", recupero: "0:00", note: "" })
    const [modificaRiga, setModificaRiga] = useState(null)
    const [data, setData] = useState(frameworkSalvato.dataDaFare)
    const [nomeFramework, setNomeFramework] = useState(frameworkSalvato.nomeFramework)

    const { t, i18n } = useTranslation()

    useEffect(() => {

        setFrame(frameworkSalvato)
        const listaRigheCopia = frameworkSalvato.listaRighe.map(riga => {return {...riga, passo: 0}})

        setListaRighe([...listaRigheCopia])
        setListaRigheCopia([...listaRigheCopia])

    }, [frameworkSalvato])

    const aggiungiRiga = (riga) => {
        if(modificaRiga) {
            setListaRighe(listaRighe.map(el => {
                if(el.idRiga && el.idRiga === modificaRiga.idRiga) {
                    return {...el, ...datiSingolaRiga}
                }
                return {...el}
            }))
            setModificaRiga(null)
        }
        else {
            setListaRighe([...listaRighe, {...riga, idRiga: uuidv4()}])
        }
    }

    const reset = () => {
        if(window.confirm(t('scrivi-framework:reset-framework'))) {
            setListaRighe([])
        }
    }

    const salvaFramework = () => {
        if(nomeFramework!==frame.nomeFramework) {
            const f = {listaRighe, tipo: t('scrivi-framework:combinati-tri:combinati-tri'), tipoPerSelect: "combinati_tri", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework, id: uuidv4()}
           
            dispatch(addFramework(f))
            setFrame(f)// andrea
        } else {
            const ff = {listaRighe, tipo: t('scrivi-framework:combinati-tri:combinati-tri'), tipoPerSelect: "combinati_tri", dataDaFare: data,
            dataCreazione: Date.now(), nomeFramework: frame.nomeFramework, id: frame.id}
            
            dispatch(replaceFramework(ff))
            setFrame(ff)// andrea
        }
    }

    const esci = () => {
        const isFrameworkUguale = () => {
            if(data!==frame.dataDaFare) return false
            if(nomeFramework!==frame.nomeFramework) return false
            if(listaRighe.length!==listaRigheCopia.length) return false

            for(let c=0;c<listaRighe.length;c++) {
                if(listaRighe[c].esercizio!==listaRigheCopia[c].esercizio) return false
                if(listaRighe[c].serie!==listaRigheCopia[c].serie) return false
                if(listaRighe[c].ripetizioni!==listaRigheCopia[c].ripetizioni) return false
                if(listaRighe[c].peso!==listaRigheCopia[c].peso) return false
                if(listaRighe[c].recupero!==listaRigheCopia[c].recupero) return false
                if(listaRighe[c].tut!==listaRigheCopia[c].tut) return false
                if(listaRighe[c].note!==listaRigheCopia[c].note) return false
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

    return (
        <div className={styles.container}>
            <div className={styles.containerBottoniTop}>
                <Button variant="contained" onClick={esci}>{t('main-container:indietro')}</Button>
            </div>

            <Intestazione setData={setData} nomeFramework={nomeFramework} setNomeFramework={setNomeFramework} />

            <TabCombinatiTriAddRiga aggiungiRiga={aggiungiRiga} datiSingolaRiga={datiSingolaRiga}
            setDatiSingolaRiga={setDatiSingolaRiga} modificaRiga={modificaRiga} />

            <TabCombinatiTriDragNDrop listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
            setModificaRiga={setModificaRiga} />

            <Button className={styles.bottoneSalva} variant="contained"
            onClick={salvaFramework}>{t('scrivi-framework:salva')}</Button>
            
            <Button className={styles.bottoneReset} variant="contained"
            onClick={reset}>RESET</Button>
        </div>
    )
}

export default CombinatiTri