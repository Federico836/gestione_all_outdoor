import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabCorsaDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../../utils/funzioni'
import { calcolaDistanzaTot, calcTempoRiga, calcRecuperoRiga } from './funzioniCorsa.js'

const Row = (props) => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice } = props
    
    const { t, i18n } = useTranslation()

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className={styles.containerTab} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.zona.descrizione}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.distanza/1000).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcTempoRiga(riga)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}>
                <span>{riga.zona.zona>1 && riga.zona.zona<6 ? toHHMMSS(riga.passoMin)+"-"+toHHMMSS(riga.passoMax) : toHHMMSS(riga.passoMax)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaDistanzaTot(riga).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.note}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => aggiungiRiga(riga)}><span>📋</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setModificaRiga(riga)}><span>✎</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setListaRighe(listaRighe.filter(el => el.idRiga !== riga.idRiga))}><span>🗑</span></div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice}) => <Row riga={riga} listaRighe={listaRighe}
    setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} indice={indice} />)

const SortableList = SortableContainer(({items, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} indice={index} riga={riga} listaRighe={listaRighe}
                    setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
            )), [items]) }
        </div>
    )
})

const Lista = (props) => {

    const { listaRighe, setListaRighe, aggiungiRiga, setModificaRiga } = props
    const { t, i18n } = useTranslation()

    const items = listaRighe
   
    const onSortEnd = ({oldIndex, newIndex}) => {
        setListaRighe(scambioElementiArray(listaRighe, oldIndex, newIndex))
    }

    let totDistanza = 0
    let totTempo = 0
    let totRecupero = 0
    for(let c=0;c<listaRighe.length;c++) {
        const riga = listaRighe[c]
        totDistanza += calcolaDistanzaTot(riga)
        totTempo += getSecondsFromHHMMSS(calcTempoRiga(riga))
        totRecupero += getSecondsFromHHMMSS(calcRecuperoRiga(riga))
    }

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', backgroundColor: "#ffcccb"}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:zona')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:serie')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:distanza')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:recupero')}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:tempo-medio')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:passo')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Tot {t('scrivi-framework:corsa:distanza')}</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center'}}>Tot: {toHHMMSS(totTempo)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {totDistanza.toFixed(3)}</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista