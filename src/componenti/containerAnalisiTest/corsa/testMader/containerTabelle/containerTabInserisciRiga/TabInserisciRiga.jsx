import React from "react"
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from "../../../../../utils/funzioniGrafici/formatta"

const TabInserisciRiga = props => {
    const { puntoCliccato, setPuntoCliccato } = props

    const { t, i18n } = useTranslation()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('test-mader:tab-punti:lattato')}</th>
                        <th>{t('test-mader:tab-punti:potenza')}</th>
                        <th>{t('test-mader:tab-punti:fc')}<sup>30</sup></th>
                        <th>RPM<sup>30</sup></th>
                        <th>{t('test-mader:tab-punti:tempo')}</th>
                        <th>{t('test-mader:tab-punti:glicemia')}</th>
                        <th>O<sub>2</sub></th>
                        <th>RPE</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" value={puntoCliccato.lattato} onChange={e => setPuntoCliccato({...puntoCliccato, lattato: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td>{puntoCliccato.potenza ? puntoCliccato.potenza : ""}</td>
                        <td>{puntoCliccato.heartrate ? Math.round(puntoCliccato.heartrate*10)/10 : ""}</td>
                        <td>{puntoCliccato.rpm ? Math.round(puntoCliccato.rpm*10)/10 : ""}</td>
                        <td>{puntoCliccato.tempo ? toHHMMSS(puntoCliccato.tempo) : ""}</td>
                        <td><input type="number" value={puntoCliccato.glicemia} onChange={e => setPuntoCliccato({...puntoCliccato, glicemia: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td>{puntoCliccato.o2 ? puntoCliccato.o2/10 : ""}</td>
                        <td><input type="number" value={puntoCliccato.rpe} onChange={e => setPuntoCliccato({...puntoCliccato, rpe: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="text" value={puntoCliccato.note} onChange={e => setPuntoCliccato({...puntoCliccato, note: e.target.value})} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabInserisciRiga

