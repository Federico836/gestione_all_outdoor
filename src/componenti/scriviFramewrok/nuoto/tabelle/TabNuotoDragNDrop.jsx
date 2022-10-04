import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabNuotoDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'
import { calcolaDistanzaTot, calcolaTempoPercor, calcolaRipartenza, calcolaTempoTot, calcolaRecuperoTot } from './funzioniNuoto.js'

const Row = (props) => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice } = props
    
    const { t, i18n } = useTranslation()

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
            case 'strokeType':

                    switch (value) {
                        case 'BACKSTROKE':
                            string = "Dorso"
                            break;
                        case 'BREASTSTROKE':
                            string = "Rana"
                            break;
                        case 'DRILL':
                            string = "Tecnica"
                            break;
                        case 'BUTTERFLY':
                            string = "Farfalla"
                            break;
                        case 'FREESTYLE':
                            string = "Stile"
                            break;
                        case 'MIXED':
                            string = "Misto"
                            break;
                    
                        default:
                            break;
                    }
                
                break;
            case 'equipmentType':

                    switch (value) {
                        case 'NONE':
                            string = "No"
                            break;
                        case 'SWIM_FINS':
                            string = "Pinne"
                            break;
                        case 'SWIM_KICKBOARD':
                            string = "Tavoletta"
                            break;
                        case 'SWIM_PADDLES':
                            string = "Palette"
                            break;
                        case 'SWIM_PULL_BUOY':
                            string = "Pull Buoy"
                            break;
                        case 'SWIM_SNORKEL':
                            string = "Snorkel"
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

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className={styles.containerTab} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue("durationType",riga.durationType)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue("intensity",riga.intensity)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue("strokeType",riga.strokeType)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{getStringByPropAndValue("equipmentType",riga.equipmentType)}</span></div>

            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.zona.descrizione}</span></div>
            {/* <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.serie}</span></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.distanza}</span></div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.tempo}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
            {/* <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaTempoPercor(riga)}</span></div> */}
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaRipartenza(riga)}</span></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaTempoTot(riga)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaDistanzaTot(riga)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.calorie}</span></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.note}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => aggiungiRiga(riga)}><span>📋</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setModificaRiga(riga)}><span>✎</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setListaRighe(listaRighe.filter(el => el.idRiga !== riga.idRiga))}><span>🗑</span></div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice}) => {

    return (
        <Row riga={riga} listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga}
        setModificaRiga={setModificaRiga} indice={indice} />
    )
})

const SortableList = SortableContainer(({items, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} indice={index} riga={riga} listaRighe={listaRighe}
                    setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
            )
            ), [items]) }
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
        totTempo += getSecondsFromHHMMSS(calcolaTempoTot(riga))
        totRecupero += getSecondsFromHHMMSS(calcolaRecuperoTot(riga))
    }

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', backgroundColor: "#add8e6"}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Obbiettivo</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Fase di lavoro</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Stile</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Attrezzo</div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:zona')}</div>
            {/* <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:serie')}</div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:distanza')} m/yrd</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:tempo-percorrenza')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:recupero')}</div>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:ripartenza')}</div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Tot {t('scrivi-framework:nuoto:tempo')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Tot {t('scrivi-framework:nuoto:distanza')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Calorie</div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:nuoto:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center'}}></div>
            {/* <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totTempo)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {totDistanza}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista