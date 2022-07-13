import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcVarPerc, toHHMMSS } from '../../../../../../utils/funzioni'
import { getSecondsFromMMSS, toMMSS } from '../../../../../../utils/funzioni'
import styles from './TabCompTestMader.module.css'

const TabCompTestMader = props => {

    const { puntiSelectedMader, marginTop } = props

    const { t, i18n } = useTranslation()

    const tab = {
        data: [],
        lattato1: [],
        lattato2: [],
        velKmh1: [],
        velKmh2: [],
        velMs1: [],
        velMs2: [],
        passo10001: [],
        passo10002: [],
        heartrate1: [],
        heartrate2: [],
        glicemia1: [],
        glicemia2: [],
        o21: [],
        o22: [],
        rpe1: [],
        rpe2: []
    }

    for(let c=0;c<puntiSelectedMader.length-1;c++) {
        const test1 = puntiSelectedMader[c]
        const test2 = puntiSelectedMader[c+1]

        if(c===0) tab.data.push(<td><nobr>{new Date(test1.data).toLocaleDateString()}</nobr></td>)
        tab.data.push(<td>{t('analisi-test:variazione')}</td>)
        tab.data.push(<td><nobr>{t('analisi-test:variazione')} %</nobr></td>)
        tab.data.push(<td><nobr>{new Date(test2.data).toLocaleDateString()}</nobr></td>)
        for(let prop in test1.tabTotali) {
            if(prop==="lattato1" || prop=="lattato2") {
                if(c===0) tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
                tab[prop].push(<td>{"⠀"}</td>)
            } else if(prop==="passo10001" || prop==="passo10002") {
                const { diff, percent } = calcVarPerc(getSecondsFromMMSS(test1.tabTotali[prop]), getSecondsFromMMSS(test2.tabTotali[prop]))
                if(c===0) tab[prop].push(<td>{test1.tabTotali[prop]}</td>)
                tab[prop].push(<td>{diff>=0 ? toHHMMSS(diff) : "-"+toHHMMSS(Math.abs(diff))}</td>)
                tab[prop].push(<td>{isFinite(percent) ? percent : "N/A"}</td>)
                tab[prop].push(<td>{test2.tabTotali[prop]}</td>)
            } else {
                const { diff, percent } = calcVarPerc(test1.tabTotali[prop], test2.tabTotali[prop])
                if(c===0) tab[prop].push(<td>{isFinite(test1.tabTotali[prop]) ? test1.tabTotali[prop] : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(diff) ? diff : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(percent) ? percent : "N/A"}</td>)
                tab[prop].push(<td>{isFinite(test2.tabTotali[prop]) ? test2.tabTotali[prop] : "N/A"}</td>)
            }
        }
    }
            
    return (
        <div className={styles.container} style={{marginTop: marginTop /* width: 'fit-content', maxWidth: '90vw' */}}>
            <div className={styles.tabCompLegend}>
                <table>
                    <tbody>
                        <tr><td>{t('scrivi-framework:corsa:data')}</td></tr>
                        <tr><td><nobr>{t('analisi-test:corsa:mader:lattato')} {puntiSelectedMader[0] ? puntiSelectedMader[0].tabTotali.lattato1 : ""}</nobr></td></tr>
                        <tr><td><nobr>{t('analisi-test:corsa:mader:velocita')} Km/h</nobr></td></tr>
                        <tr><td><nobr>{t('analisi-test:corsa:mader:velocita')} m/s</nobr></td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:passo')} 1000</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:fc')}</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:glicemia')}</td></tr>
                        <tr><td>o²</td></tr>
                        <tr><td>RPE</td></tr>
                        <tr><td><nobr>{t('analisi-test:corsa:mader:lattato')} {puntiSelectedMader[0] ? puntiSelectedMader[0].tabTotali.lattato2 : ""}</nobr></td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:velocita')} Km/h</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:velocita')} m/s</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:passo')} 1000</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:fc')}</td></tr>
                        <tr><td>{t('analisi-test:corsa:mader:glicemia')}</td></tr>
                        <tr><td>o²</td></tr>
                        <tr><td>RPE</td></tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.tabComp}>
                <table>
                    <tbody>
                        <tr>{tab.data}</tr>
                        <tr>{tab.lattato1}</tr>
                        <tr>{tab.velKmh1}</tr>
                        <tr>{tab.velMs1}</tr>
                        <tr>{tab.passo10001}</tr>
                        <tr>{tab.heartrate1}</tr>
                        <tr>{tab.glicemia1}</tr>
                        <tr>{tab.o21}</tr>
                        <tr>{tab.rpe1}</tr>
                        <tr>{tab.lattato2}</tr>
                        <tr>{tab.velKmh2}</tr>
                        <tr>{tab.velMs2}</tr>
                        <tr>{tab.passo10002}</tr>
                        <tr>{tab.heartrate2}</tr>
                        <tr>{tab.glicemia2}</tr>
                        <tr>{tab.o22}</tr>
                        <tr>{tab.rpe2}</tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabCompTestMader

