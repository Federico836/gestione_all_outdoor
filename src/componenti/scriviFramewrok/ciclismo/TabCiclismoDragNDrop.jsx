import React, {useMemo, useState, useEffect} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { useDispatch, useSelector } from 'react-redux'
import styles from './TabCiclismoDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../utils/funzioniArray'

const Row = (props) => {

    const { riga } = props
    
    const { t, i18n } = useTranslation()

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{riga.zona}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{riga.watt}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{riga.fc}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{riga.serie}</div>
            <div style={{border: '1px solid gray', width: '60%', textAlign: 'center'}}>{riga.ripetizioni}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{riga.durata}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{riga.recupero}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>{riga.rpm}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>{riga.note}</div>
        </div>
    )
}

const SortableItem = SortableElement(({riga}) => <Row riga={riga} />)

const SortableList = SortableContainer(({items}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} riga={riga} />
            )), [items]) }
        </div>
    )
})

const Lista = (props) => {

    const { listaRighe, setListaRighe } = props
    const { t, i18n } = useTranslation()

    const items = listaRighe
    /* for(let c=0;c<listaRighe.length;c++) {
        items.push({
            key: c,
            nome: listaRighe[c].nome,
            tipo: listaRighe[c].tipo,
            grafico: "fsgffgs",
            uploaded: listaRighe[c].uploaded,
            error: listaRighe[c].error,
        })
    } */
   
    const onSortEnd = ({oldIndex, newIndex}) => {
        setListaRighe(scambioElementiArray(listaRighe, oldIndex, newIndex))
    }

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:zona')}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>Watt</div>
            <div style={{border: '1px solid gray', width: '60%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:fc')}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:serie')}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:durata')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:recupero')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>Rpm</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>Note</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y" />
      </div>
    )
}

export default Lista