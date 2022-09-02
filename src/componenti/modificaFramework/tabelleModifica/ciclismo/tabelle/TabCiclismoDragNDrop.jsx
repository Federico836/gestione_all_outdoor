import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabCiclismoDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../../utils/funzioni'
import { calcTempoRiga } from './funzioniCiclismo'

const Row = props => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice } = props
    
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

    const getStringByPropAndValue = (prop,value) => {

        if(!prop) return value

        let string = ""

        switch (prop) {
            case 'durationType':

                //TIME, DISTANCE(in KM), HR_LESS_THAN, HR_GREATER_THAN, CALORIES, OPEN,

                switch (value) {
                    case 'TIME':
                        string = "Tempo"
                        break;
                    case 'DISTANCE':
                        string = "Distanza"
                        break;
                    case 'HR_LESS_THAN':
                        string = "Freq. Cardiaca"
                        break;
                    case 'CALORIES':
                        string = "Calorie"
                        break;
                    case 'OPEN':
                        string = "Altro"
                        break;
                
                    default:
                        break;
                }
                
                break;
            case 'intensity':

                //REST, WARMUP, COOLDOWN, RECOVERY, INTERVAL

                switch (value) {
                    case 'REST':
                        string = "Rec. passivo"
                        break;
                    case 'WARMUP':
                        string = "Risc."
                        break;
                    case 'COOLDOWN':
                        string = "Defat."
                        break;
                    case 'RECOVERY':
                        string = "Recupero"
                        break;
                    case 'INTERVAL':
                        string = "Intervallo"
                        break;
                
                    default:
                        break;
                }
                
                break;
            case 'targetType':

                /* PERCENT_HR">%
                    PERCENT_WATT"
                    ZONE_HR">ZONA
                    ZONE_W">ZONA 
                    CADENCE">CADE
                    OPEN">LIBERO< */

                    switch (value) {
                        case 'PERCENT_HR':
                            string = "% HR"
                            break;
                        case 'PERCENT_WATT':
                            string = "% W"
                            break;
                        case 'ZONE_HR':
                            string = "Zona HR"
                            break;
                        case 'ZONE_W':
                            string = "Zona W"
                            break;
                        case 'CADENCE':
                            string = "RPM"
                            break;
                        case 'OPEN':
                            string = "Libero"
                            break;
                    
                        default:
                            break;
                    }
                
                break;
        
            default:
                break;
        }

        return string
    }

    return (
        <div className={styles.containerTab} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue('durationType',riga.durationType)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue('intensity',riga.intensity)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue('targetType',riga.targetType)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.targetType === 'ZONE_W' || riga.targetType === 'ZONE_HR') ? riga.zona : ''}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.targetType === 'PERCENT_WATT' || riga.targetType === 'PERCENT_HR') ? riga.percZona : ''}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.targetType === 'PERCENT_WATT' || riga.targetType === 'ZONE_W') ? zonaWatt : ''}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.targetType === 'PERCENT_HR' || riga.targetType === 'ZONE_HR') ? zonaFc : ''}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.durata}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.rpm}</span></div>
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

const Lista = props => {

    const { listaRighe, setListaRighe, aggiungiRiga, setModificaRiga } = props
    const { t, i18n } = useTranslation()

    console.log(listaRighe)

    const items = listaRighe
   
    const onSortEnd = ({oldIndex, newIndex}) => {
        setListaRighe(scambioElementiArray(listaRighe, oldIndex, newIndex))
    }

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
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Obbiettivo</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Fase di lavoro</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Intensità</div>
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
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:ciclismo:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
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
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista