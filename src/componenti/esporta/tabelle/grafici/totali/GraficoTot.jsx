import React from "react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from "../../../../../utils/funzioni"

const CiclTempoZone = props => {
    const { tempoZone } = props

    const { t, i18n } = useTranslation()

    console.log(tempoZone)

    const listaZoneGrafico = ["Z1", "Z2", "Z3", "Z4", "Z5", "Z6", "Z7"].map((zona, indexZona) => {
        const el = {zona}

        el.tot = tempoZone["zona"+(indexZona+1)]

        return el
    })

    const listaColoriCicl = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriCicl[0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const CorsaTempoZone = props => {
    const { tempoZone } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["FLR", "FLR", "FM", "FV", "SG", "VO2"].map((zona, indexZona) => {
        const el = {zona}

        el.tot = tempoZone["zona"+(indexZona+1)]

        return el
    })

    const listaColoriCorsa = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriCorsa[4]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const NuotoTempoZone = props => {
    const { tempoZone } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["A1", "A2", "B1", "B2", "C1", "C2", "C3", "D"].map((zona, indexZona) => {
        const el = {zona}

        el.tot = tempoZone["zona"+(indexZona+1)]

        return el
    })

    const listaColoriNuoto = ["#0c3953", "#094c72", "#0079bf", "#298fca", "#5ba4cf", "#8bbdd9", "#bcd9ea"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis tickFormatter={el => toHHMMSS(el)} />
                <Tooltip formatter={el => toHHMMSS(el)} />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriNuoto[0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const CiclTrimp = props => {
    const { totali } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = []
    listaZoneGrafico.push({zona: "aerobic", tot: Math.round(totali.trimpCiclAerobic*100)/100})
    listaZoneGrafico.push({zona: "mixed", tot: Math.round(totali.trimpCiclMixed*100)/100})
    listaZoneGrafico.push({zona: "anaerobic", tot: Math.round(totali.trimpCiclAnaerobic*100)/100})
    listaZoneGrafico.push({zona: "total", tot: Math.round(totali.trimpCiclTotal*100)/100})

    const listaColoriCicl = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis /* domain={['dataMin', 'dataMax + 60']} */ />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriCicl[0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const CorsaTrimp = props => {
    const { totali } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = []
    listaZoneGrafico.push({zona: "aerobic", tot: Math.round(totali.trimpCorsaAerobic*100)/100})
    listaZoneGrafico.push({zona: "mixed", tot: Math.round(totali.trimpCorsaMixed*100)/100})
    listaZoneGrafico.push({zona: "anaerobic", tot: Math.round(totali.trimpCorsaAnaerobic*100)/100})
    listaZoneGrafico.push({zona: "total", tot: Math.round(totali.trimpCorsaTotal*100)/100})

    const listaColoriCorsa = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis /* domain={['dataMin', 'dataMax + 60']} */ />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriCorsa[4]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const NuotoTrimp = props => {
    const { totali } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = []
    listaZoneGrafico.push({zona: "aerobic", tot: Math.round(totali.trimpNuotoAerobic*100)/100})
    listaZoneGrafico.push({zona: "mixed", tot: Math.round(totali.trimpNuotoMixed*100)/100})
    listaZoneGrafico.push({zona: "anaerobic", tot: Math.round(totali.trimpNuotoAnaerobic*100)/100})
    listaZoneGrafico.push({zona: "total", tot: Math.round(totali.trimpNuotoTotal*100)/100})

    const listaColoriNuoto = ["#0c3953", "#094c72", "#0079bf", "#298fca", "#5ba4cf", "#8bbdd9", "#bcd9ea"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis /* domain={['dataMin', 'dataMax + 60']} */ />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="tot" fill={listaColoriNuoto[0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export { CiclTempoZone, CorsaTempoZone, NuotoTempoZone, CiclTrimp, CorsaTrimp, NuotoTrimp }
