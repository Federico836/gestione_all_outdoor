import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import './TabDragNDrop.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'
import { calcolaDistanzaTot, calcTempoRiga, calcRecuperoRiga } from '../../../scriviFramewrok/corsa/tabelle/funzioniCorsa'

const Row = props => {

    const { riga, indice } = props
    
    const { t, i18n } = useTranslation()

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className="containerTab" style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.zona.descrizione}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{(riga.distanza/1000).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{calcTempoRiga(riga)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}>
                <span>{riga.zona.zona>1 && riga.zona.zona<6 ? toHHMMSS(riga.passoMin)+"-"+toHHMMSS(riga.passoMax) : toHHMMSS(riga.passoMax)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{calcolaDistanzaTot(riga).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.note}</span></div>
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

    const { listaRighe } = props
    const { t, i18n } = useTranslation()

    const items = listaRighe

    

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
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:zona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:serie')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:distanza')} Km/Mi</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:recupero')}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:tempo-medio')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:passo')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Tot {t('scrivi-framework:corsa:distanza')}</div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Note</div>
        </div>
        <SortableList items={items} pressDelay={100} axis="y" lockAxis="y" />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center'}}>Tot: {toHHMMSS(totTempo)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {totDistanza.toFixed(3)}</div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista
