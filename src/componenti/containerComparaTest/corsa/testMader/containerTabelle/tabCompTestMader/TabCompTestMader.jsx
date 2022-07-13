import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcVarPerc } from '../../../../../../utils/funzioni'
import styles from './TabCompTestMader.module.css'

const TabCompTestMader = props => {

    const { puntiSelectedMader, marginTop } = props

    const { t, i18n } = useTranslation()

    const tab = {
        data: [],
        lattato1: [],
        potenza1: [],
        heartrate1: [],
        rpm1: [],
        glicemia1: [],
        o21: [],
        rpe1: [],
        lattato2: [],
        potenza2: [],
        heartrate2: [],
        rpm2: [],
        glicemia2: [],
        o22: [],
        rpe2: [],
    }

    for(let c=0;c<puntiSelectedMader.length-1;c++) {
        const test1 = puntiSelectedMader[c]
        const test2 = puntiSelectedMader[c+1]

        if(c===0) tab.data.push(<td><nobr>{test1.dati.data}</nobr></td>)
        tab.data.push(<td>{t('comp-test:variazione')}</td>)
        tab.data.push(<td><nobr>{t('comp-test:variazione')} %</nobr></td>)
        tab.data.push(<td><nobr>{test2.dati.data}</nobr></td>)
        for(let prop in test1.dati.dati) {
            if(prop==="lattato1" || prop=="lattato2") {
                if(c===0) tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
            } else {
                const { diff, percent } = calcVarPerc(test1.dati.dati[prop], test2.dati.dati[prop])
                if(c===0) tab[prop].push(<td>{isFinite(test1.dati.dati[prop]) ? test1.dati.dati[prop] : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(diff) ? diff : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(percent) ? percent : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(test2.dati.dati[prop]) ? test2.dati.dati[prop] : "N/A"}</td>)
            }
        }
    }
            
    return (
        <div className={styles.container} style={{marginTop: marginTop /* width: 'fit-content', maxWidth: '90vw' */}}>
            <div className={styles.tabCompLegend}>
                <table>
                    <tr><td>{t('comp-test:data')}</td></tr>
                    <tr><td><nobr>{t('tab-test-mader:lattato')} {puntiSelectedMader[0] ? puntiSelectedMader[0].dati.dati.lattato1 : ""}</nobr></td></tr>
                    <tr><td>Watt</td></tr>
                    <tr><td>{t('tab-test-mader:fc')}</td></tr>
                    <tr><td>RPM</td></tr>
                    <tr><td>{t('tab-test-mader:glicemia')}</td></tr>
                    <tr><td>o²</td></tr>
                    <tr><td>RPE</td></tr>
                    <tr><td><nobr>{t('tab-test-mader:lattato')} {puntiSelectedMader[0] ? puntiSelectedMader[0].dati.dati.lattato2 : ""}</nobr></td></tr>
                    <tr><td>Watt</td></tr>
                    <tr><td>{t('tab-test-mader:fc')}</td></tr>
                    <tr><td>RPM</td></tr>
                    <tr><td>{t('tab-test-mader:glicemia')}</td></tr>
                    <tr><td>o²</td></tr>
                    <tr><td>RPE</td></tr>
                </table>
            </div>
            <div className={styles.tabComp}>
                <table>
                    <tr>{tab.data}</tr>
                    <tr>{tab.lattato1}</tr>
                    <tr>{tab.potenza1}</tr>
                    <tr>{tab.heartrate1}</tr>
                    <tr>{tab.rpm1}</tr>
                    <tr>{tab.glicemia1}</tr>
                    <tr>{tab.o21}</tr>
                    <tr>{tab.rpe1}</tr>
                    <tr>{tab.lattato2}</tr>
                    <tr>{tab.potenza2}</tr>
                    <tr>{tab.heartrate2}</tr>
                    <tr>{tab.rpm2}</tr>
                    <tr>{tab.glicemia2}</tr>
                    <tr>{tab.o22}</tr>
                    <tr>{tab.rpe2}</tr>
                </table>
            </div>
        </div>
    )
}

export default TabCompTestMader

