import React, {useMemo, useState, useEffect} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabCiclismoDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../utils/funzioniArray'

const Row = (props) => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga } = props
    
    const { t, i18n } = useTranslation()

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.zona}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{(riga.zona>1 && riga.zona<7) ? (riga.wattMin+"-"+riga.wattMax) : riga.wattMax}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{(riga.zona>1 && riga.zona<5) ? (riga.fcMin+"-"+riga.fcMax) : riga.fcMax}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.serie}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.ripetizioni}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.durata}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.recupero}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.rpm}</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}>{riga.note}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer"}}
                onClick={() => aggiungiRiga(riga)}>📋</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer"}}
                onClick={() => setModificaRiga(riga)}>✎</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer"}}
                onClick={() => setListaRighe(listaRighe.filter(el => el.idRiga !== riga.idRiga))}>🗑</div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga}) => <Row riga={riga} listaRighe={listaRighe}
    setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />)

const SortableList = SortableContainer(({items, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} riga={riga} listaRighe={listaRighe}
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

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:zona')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Watt</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:fc')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:serie')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:durata')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:recupero')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Rpm</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
      </div>
    )
}

export default Lista