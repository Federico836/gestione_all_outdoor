import React, {useMemo} from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import styles from './TabCorsaDragNDrop.module.css'
import { useTranslation } from 'react-i18next'
import { scambioElementiArray } from '../../../../utils/funzioniArray'
import { getSecondsFromHHMMSS, toHHMMSS } from '../../../../utils/funzioni'

const Row = (props) => {

    const { riga, listaRighe, setListaRighe, aggiungiRiga, setModificaRiga } = props
    
    const { t, i18n } = useTranslation()

    return (
        <div className={styles.containerTab}>    
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.zona}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.serie}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.ripetizioni}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.distanza}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.recupero}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.durata}</span></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center', display: "flex", alignItems: "center"}}><span>{riga.passo}</span></div>
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

    let totDurata = 0
    let totRecupero = 0
    for(let c=0;c<listaRighe.length;c++) {
        totDurata += getSecondsFromHHMMSS(listaRighe[c].durata)
        totRecupero += getSecondsFromHHMMSS(listaRighe[c].recupero)
    }

    return (
      <div style={{border: '1px solid gray', display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}> 
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:zona')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:serie')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:ripetizioni')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:distanza')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:recupero')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:durata')}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>{t('scrivi-framework:corsa:passo')}</div>
            <div style={{border: '1px solid gray', width: '30%', textAlign: 'center'}}>Note</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:corsa:clona')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:corsa:modifica')}</div>
            <div style={{border: '1px solid gray', width: '8%', textAlign: 'center'}}>{t('scrivi-framework:corsa:elimina')}</div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} pressDelay={100} axis="y" lockAxis="y"
        listaRighe={listaRighe} setListaRighe={setListaRighe} aggiungiRiga={aggiungiRiga} setModificaRiga={setModificaRiga} />
        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}></div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totRecupero)}</div>
            <div style={{border: '1px solid gray', width: '10%', textAlign: 'center'}}>Tot: {toHHMMSS(totDurata)}</div>
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