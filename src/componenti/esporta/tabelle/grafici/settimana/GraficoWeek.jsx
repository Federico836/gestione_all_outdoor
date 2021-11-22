import React from "react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from "../../../../../utils/funzioni"

const CiclTempoZone = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["Z1", "Z2", "Z3", "Z4", "Z5", "Z6", "Z7"].map(zona => {
        const el = {zona}

        eventi.forEach((week, index) => {
            if(week.ciclismo) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=week.ciclismo.tempoZone["zona"+zona.charAt(1)]
            }
        })

        return el
    })

    const listaColoriCicl = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]

    return (
        <ResponsiveContainer width="30%" height={250} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                <Legend />
                {eventi.map((week, index) => week.ciclismo ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriCicl[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const CorsaTempoZone = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["FLR", "FLR", "FM", "FV", "SG", "VO2"].map((zona, indexZona) => {
        const el = {zona}

        eventi.forEach((week, index) => {
            if(week.corsa) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=week.corsa.tempoZone["zona"+(indexZona+1)]
            }
        })

        return el
    })

    const listaColoriCorsa = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]

    return (
        <ResponsiveContainer width="30%" height={250} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                <Legend />
                {eventi.map((week, index) => week.corsa ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriCorsa[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const NuotoTempoZone = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["FLR", "FLR", "FM", "FV", "SG", "VO2"].map((zona, indexZona) => {
        const el = {zona}

        eventi.forEach((week, index) => {
            if(week.nuoto) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=week.nuoto.tempoZone["zona"+(indexZona+1)]
            }
        })

        return el
    })

    const listaColoriNuoto = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]

    return (
        <ResponsiveContainer width="30%" height={250} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                <Legend />
                {eventi.map((week, index) => week.nuoto ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriNuoto[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

export { CiclTempoZone, CorsaTempoZone, NuotoTempoZone }

