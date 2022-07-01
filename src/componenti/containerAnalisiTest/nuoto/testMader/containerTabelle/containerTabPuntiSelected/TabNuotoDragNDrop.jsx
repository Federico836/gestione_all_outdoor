import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { useTranslation } from 'react-i18next'
import { toMMSS } from '../../../../../../utils/funzioni'
import styles from './TabNuotoDragNDrop.module.css'

const Row = props => {

    const { riga, puntiSelected, setPuntiSelected, setModificaRiga, indice } = props

    let coloreRiga = "white"
    if(indice%2 !== 0) {
        coloreRiga = "#d3d3d3"
    }

    return (
        <div className={styles.containerTab} style={{backgroundColor: coloreRiga}}>    
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{indice+1}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.lattato}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.distanza}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{toMMSS(riga.tempo)}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{Math.round(riga.velKmh*100)/100}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{Math.round(riga.velMs*100)/100}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.passo100}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.heartrate}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.glicemia}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.o2}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.rpe}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{Math.round(riga.strokeLength*100)/100}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.strokeFreq}</span></div>
            <div style={{border: '1px solid gray', width: '25%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.note}</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setModificaRiga(riga)}><span>✎</span></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center', cursor: "pointer", display: "flex", alignItems: "center"}}
                onClick={() => setPuntiSelected(puntiSelected.filter(el => el.idRiga !== riga.idRiga))}><span>🗑</span></div>
        </div>
    )
}

const SortableItem = SortableElement(({riga, puntiSelected, setPuntiSelected,  setModificaRiga, indice}) => <Row riga={riga}
    puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected} setModificaRiga={setModificaRiga} indice={indice} />)

const SortableList = SortableContainer(({puntiSelected, setPuntiSelected, setModificaRiga}) => {

    return (
        <div>
            {useMemo(() => puntiSelected.map((riga, index) => (
                <SortableItem key={`item-${index}`} index={index} indice={index} riga={riga} puntiSelected={puntiSelected}
                setPuntiSelected={setPuntiSelected} setModificaRiga={setModificaRiga} />
            )), [puntiSelected]) }
        </div>
    )
})

const Lista = props => {

    const { puntiSelected, setPuntiSelected, setModificaRiga } = props
    const { t, i18n } = useTranslation()
   
    const onSortEnd = ({oldIndex, newIndex}) => {
        const listaFiltrata = puntiSelected.filter((riga, c) => c!==oldIndex)
        listaFiltrata.splice(newIndex, 0, puntiSelected[oldIndex])
        setPuntiSelected(listaFiltrata)
    }

    /* let totDurata = 0
    let totRecupero = 0
    for(let c=0;c<listaRighe.length;c++) {
        const riga = listaRighe[c]
        totDurata += calcTempoRiga(riga, riga => riga.durata)
        totRecupero += calcTempoRiga(riga, riga => riga.recupero)
    } */

    return (
      <div style={{marginTop: "3vh", border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', backgroundColor: "#add8e6"}}> 
            <div style={{border: '1px solid gray', width: '8%', display: "flex", justifyContent: "center", alignItems: "center"}}>Num</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:lattato')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>Dist.</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:tempo')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:velocita')} Km/h</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:velocita')} m/s</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:passo')} 100</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:fc')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:glicemia')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>O²</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>RPE</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:stroke-length')}</div>
            <div style={{border: '1px solid gray', width: '10%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('analisi-test:corsa:mader:stroke-freq')}</div>
            <div style={{border: '1px solid gray', width: '25%', display: "flex", justifyContent: "center", alignItems: "center"}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:ciclismo:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', display: "flex", justifyContent: "center", alignItems: "center"}}>{t('scrivi-framework:ciclismo:elimina')}</div>
        </div>
        <SortableList puntiSelected={puntiSelected} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        setPuntiSelected={setPuntiSelected} setModificaRiga={setModificaRiga} />
        {/* <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}></div>
        </div> */}
      </div>
    )
}

export default Lista