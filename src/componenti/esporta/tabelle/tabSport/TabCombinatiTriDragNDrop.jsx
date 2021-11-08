import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'

const Row = props => {

    const { riga, indice } = props
    
    const { t, i18n } = useTranslation()

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className={'containerTab'} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.sport}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.zona}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.tempoDist}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.passo}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.note}</span></div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, indice}) => <Row riga={riga} indice={indice} />)

const SortableList = SortableContainer(({items}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} indice={index} riga={riga} />
            )), [items]) }
        </div>
    )
})

const Lista = props => {

    const { listaRighe} = props
    const { t, i18n } = useTranslation()

    const items = listaRighe

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '15%', display: 'flex', justifyContent: "center", alignItems: "center"}}>Sport</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:zona')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:serie')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:tempo-dist')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:passo')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: 'flex', justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:combinati-tri:recupero')}</div>
            <div style={{border: '1px solid gray', width: '30%', display: 'flex', justifyContent: "center", alignItems: "center"}}>Note</div>
        </div>
        <SortableList items={items} pressDelay={100} axis="y" lockAxis="y" />
      </div>
    )
}

export default Lista