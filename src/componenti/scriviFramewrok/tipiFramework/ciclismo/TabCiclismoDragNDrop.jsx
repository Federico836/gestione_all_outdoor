import React, {useMemo, useState, useEffect} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { useDispatch, useSelector } from 'react-redux'
import styles from './TabCiclismoDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'

const Row = (props) => {

    const { allEseguito } = props
    const { key, nome, tipo } = allEseguito
    const { t, i18n } = useTranslation()

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{key+1}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{nome}</div>
            <div style={{border: '1px solid gray', width: '60%', textAlign: 'center'}}>{tipo}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}></div>
        </div>
    )
}

const SortableItem = SortableElement(({value}) => <Row allEseguito={value} />)

const SortableList = SortableContainer(({items}) => {

    return (
        <div>
            {useMemo(() => items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )), [items]) }
        </div>
    )
})

const Lista = (props) => {

    const { listaRighe, setListaRighe } = props
    const { t, i18n } = useTranslation()

    const items = []
    for(let c=0;c<listaRighe.length;c++) {
        items.push({
            key: c,
            nome: listaRighe[c].nome,
            tipo: listaRighe[c].tipo,
            grafico: "fsgffgs",
            uploaded: listaRighe[c].uploaded,
            error: listaRighe[c].error,
        })
    }
   
    const onSortEnd = ({oldIndex, newIndex}) => {
        setListaRighe(scambioElementiArray(listaRighe, oldIndex, newIndex))
    }

    return (
      <div style={{border: '1px solid gray',display: 'flex',flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>#</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{t('tab-frame-selected:nome')}</div>
            <div style={{border: '1px solid gray', width: '60%', textAlign: 'center'}}>{t('tab-frame-selected:tipo')}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{t('tab-frame-selected:rinomina')}</div>
            <div style={{border: '1px solid gray', width: '100%', textAlign: 'center'}}>{t('tab-frame-selected:scadenza')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}>{t('tab-frame-selected:grafico')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y" />
      </div>
    )
}

export default Lista