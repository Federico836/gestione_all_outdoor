import React from "react"
import { useTranslation } from 'react-i18next'

const TabTotali = props => {
    const { lattatoTabTotali, setLattatoTabTotali, tabTotali } = props

    const { t, i18n } = useTranslation()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('analisi-test:corsa:mader:lattato')}</th>
                        <th>{t('analisi-test:corsa:mader:velocita')} Km/h</th>
                        <th>{t('analisi-test:corsa:mader:velocita')} m/s</th>
                        <th>{t('analisi-test:corsa:mader:passo')} 1000</th>
                        <th>{t('analisi-test:corsa:mader:glicemia')}</th>
                        <th>O²</th>
                        <th>RPE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" value={lattatoTabTotali.lattato1} onChange={e => setLattatoTabTotali({...lattatoTabTotali, lattato1: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        {/* <td>{tabTotali.potenza1}</td>
                        <td>{tabTotali.heartrate1}</td>
                        <td>{tabTotali.rpm1}</td>
                        <td>{tabTotali.glicemia1}</td>
                        <td>{tabTotali.o21}</td>
                        <td>{tabTotali.rpe1}</td> */}
                    </tr>
                    <tr>
                        <td><input type="number" value={lattatoTabTotali.lattato2} onChange={e => setLattatoTabTotali({...lattatoTabTotali, lattato2: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        {/* <td>{tabTotali.potenza2}</td>
                        <td>{tabTotali.heartrate2}</td>
                        <td>{tabTotali.rpm2}</td>
                        <td>{tabTotali.glicemia2}</td>
                        <td>{tabTotali.o22}</td>
                        <td>{tabTotali.rpe2}</td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabTotali

