import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabSportDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'

const Row = (props) => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice } = props
    
    const { t, i18n } = useTranslation()

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className={styles.containerTab} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.zona}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.tempoDist}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
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

    /* let totRecupero = 0
    for(let c=0;c<listaRighe.length;c++) {
        totRecupero += getSecondsFromHHMMSS(listaRighe[c].recupero)
    } */

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '15%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:zona')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:serie')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:tempo-dist')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:recupero')}</div>
            <div style={{border: '1px solid gray', width: '30%', display: 'flex', justifyContent: "center", alignItems: "center"}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:sport:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
      </div>
    )
}

export default Lista