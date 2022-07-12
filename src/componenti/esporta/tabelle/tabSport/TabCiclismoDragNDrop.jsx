import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import './TabDragNDrop.css'
import { useTranslation } from 'react-i18next'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'
import { calcTempoRiga } from '../../../scriviFramewrok/ciclismo/tabelle/funzioniCiclismo'

const Row = props => {

    const { riga, indice } = props
    
    const { t, i18n } = useTranslation()

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    let zonaWatt = ""
    let zonaFc = ""
    if(riga.percZona!=="") {
        zonaWatt = riga.wattPerc
        zonaFc = riga.fcPerc
    }
    else {
        zonaWatt = (riga.zona>1 && riga.zona<7) ? (riga.wattMin+"-"+riga.wattMax) : riga.wattMax
        zonaFc = (riga.zona>1 && riga.zona<5) ? (riga.fcMin+"-"+riga.fcMax) : riga.fcMax
    }

    return (
        <div className={'containerTab'} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.zona}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.percZona}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{zonaWatt}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{zonaFc}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.durata}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}} contentEditable={true}><span>{riga.rpm}</span></div>
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

    const { listaRighe } = props
    const { t, i18n } = useTranslation()

    const items = listaRighe

    let totDurata = 0
    let totRecupero = 0
    for(let c=0;c<listaRighe.length;c++) {
        const riga = listaRighe[c]
        totDurata += calcTempoRiga(riga, riga => riga.durata)
        totRecupero += calcTempoRiga(riga, riga => riga.recupero)
    }

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', backgroundColor: "#bee5b0"}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:zona')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>%</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Watt</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:fc')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:serie')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:tempo')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:recupero')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Rpm</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}>Note</div>
        </div>
        <SortableList items={items} pressDelay={100} axis="y" lockAxis="y" />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totDurata+totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista
