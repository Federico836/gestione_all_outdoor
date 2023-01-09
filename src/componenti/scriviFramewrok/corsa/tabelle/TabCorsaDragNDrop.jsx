import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabCorsaDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'
import { calcolaDistanzaTot, calcTempoRiga, calcRecuperoRiga } from './funzioniCorsa.js'

const Row = props => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice, fc_min, fc_max } = props
    
    const { t, i18n } = useTranslation()

    console.warn({riga})

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
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
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.zona.descrizione}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.targetType === 'ZONE_HR') ? riga.zonaHR : '-'}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.perce_fc}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{ (riga.targetType === 'ZONE_HR') ?  
            fc_min + ' - ' + fc_max 
            : riga.fc}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.tempo}</span></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{(riga.distanza/1000).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcTempoRiga(riga)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}>
                <span>{(riga.zona.zona === 1 || riga.zona.zona === 7) ? toHHMMSS(riga.passoMax) : riga.zona.zona>1 && riga.zona.zona< 7 ? toHHMMSS(riga.passoMin)+"-"+toHHMMSS(riga.passoMax) : riga.zona.zona === 8 ? 'MAX' : '-' }</span>
            </div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{calcolaDistanzaTot(riga).toFixed(3)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.calorie}</span></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.note}</span></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => aggiungiRiga(riga)}><span>📋</span></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setModificaRiga(riga)}><span>✎</span></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setListaRighe(listaRighe.filter(el => el.idRiga !== riga.idRiga))}><span>🗑</span></div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, indice, fc_min, fc_max}) => <Row riga={riga} listaRighe={listaRighe}
    setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} indice={indice} fc_min={fc_min} fc_max={fc_max} />)

const SortableList = SortableContainer(({items, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, zoneCalcolateHR}) => {

    return (
        <div>
            {useMemo(() => items.map((riga, index) => {

                const zonaHR = zoneCalcolateHR.find(el => el.zona === Number(riga.zonaHR))
                const fc_min = (zonaHR) ? zonaHR.fc_min : 0
                const fc_max = (zonaHR) ? zonaHR.fc_max : 0

                return (<SortableItem key={`item-${index}`} index={index} indice={index} riga={riga} listaRighe={listaRighe} 
                                      setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} fc_min={fc_min} fc_max={fc_max}/>)

            }), [items]) }
        </div>
    )
})

const Lista = (props) => {

    const { listaRighe, setListaRighe, aggiungiRiga, setModificaRiga, zoneCalcolateHR } = props
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
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Goal</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Work</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Int</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:zona')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:zona-hr')}</div>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>% Velocità / passo</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>passo / velocità</div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>% HR</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>HR</div>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:serie')}</div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:tempo')}</div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:distanza')} Km/Mi</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:recupero')}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:tempo-medio')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{t('scrivi-framework:corsa:passo')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Tot {t('scrivi-framework:corsa:distanza')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Calorie</div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>Note</div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{/* {t('scrivi-framework:corsa:clona')} */}</div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{/* {t('scrivi-framework:corsa:modifica')} */}</div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center"}}>{/* {t('scrivi-framework:corsa:elimina')} */}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} zoneCalcolateHR={zoneCalcolateHR}/>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            {/* <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div> */}
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '15%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '12%', textAlign: 'center'}}>Tot: {toHHMMSS(totTempo)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {totDistanza.toFixed(3)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '6%', textAlign: 'center'}}></div>
        </div>
      </div>
    )
}

export default Lista
