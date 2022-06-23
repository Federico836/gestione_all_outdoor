import React, { useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { getSecondsFromMMSS, toMMSS } from "../../../../../../utils/funzioni"

const TabInserisciRiga = props => {
    const { puntoCliccato, setPuntoCliccato } = props

    const { t, i18n } = useTranslation()

    useEffect(function cambiaVel() {
        const velMs = puntoCliccato.distanza/puntoCliccato.tempo
        const velKmh = velMs*3.6
        const passo1000 = toMMSS(1000/velMs)

        setPuntoCliccato({...puntoCliccato, velKmh, velMs, passo1000})

    }, [puntoCliccato.distanza, puntoCliccato.tempo])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('analisi-test:corsa:mader:lattato')}</th>
                        <th>Dist.</th>
                        <th>{t('analisi-test:corsa:mader:tempo')}</th>
                        <th>{t('analisi-test:corsa:mader:velocita')} Km/h</th>
                        <th>{t('analisi-test:corsa:mader:velocita')} m/s</th>
                        <th>{t('analisi-test:corsa:mader:passo')} 1000</th>
                        <th>{t('analisi-test:corsa:mader:fc')}</th>
                        <th>{t('analisi-test:corsa:mader:glicemia')}</th>
                        <th>O²</th>
                        <th>RPE</th>
                        <th>{t('analisi-test:corsa:mader:stroke-length')}</th>
                        <th>{t('analisi-test:corsa:mader:stroke-freq')}</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" value={puntoCliccato.lattato} onChange={e => setPuntoCliccato({...puntoCliccato, lattato: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="number" value={puntoCliccato.distanza} onChange={e => setPuntoCliccato({...puntoCliccato, distanza: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="text" defaultValue={puntoCliccato.tempo} onChange={e => setPuntoCliccato({...puntoCliccato, tempo: getSecondsFromMMSS(e.target.value)})} /></td>
                        <td>{isFinite(puntoCliccato.velKmh) ? Math.round(puntoCliccato.velKmh*100)/100 : ""}</td>
                        <td>{isFinite(puntoCliccato.velMs) ? Math.round(puntoCliccato.velMs*100)/100 : ""}</td>
                        <td>{isFinite(puntoCliccato.velMs) ? puntoCliccato.passo1000 : ""}</td>
                        <td><input type="number" value={puntoCliccato.heartrate} onChange={e => setPuntoCliccato({...puntoCliccato, heartrate: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="number" value={puntoCliccato.glicemia} onChange={e => setPuntoCliccato({...puntoCliccato, glicemia: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="number" value={puntoCliccato.o2} onChange={e => setPuntoCliccato({...puntoCliccato, o2: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="number" value={puntoCliccato.rpe} onChange={e => setPuntoCliccato({...puntoCliccato, rpe: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td>{puntoCliccato.strokeLength ? puntoCliccato.strokeLength : ""}</td>
                        <td><input type="number" value={puntoCliccato.strokeFreq} onChange={e => setPuntoCliccato({...puntoCliccato, strokeFreq: e.target.value!=="" ? Number(e.target.value) : ""})} /></td>
                        <td><input type="text" value={puntoCliccato.note} onChange={e => setPuntoCliccato({...puntoCliccato, note: e.target.value})} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabInserisciRiga

