import React from "react"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from "../../../../../utils/funzioni"

const CiclTempoZone = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["Z1", "Z2", "Z3", "Z4", "Z5", "Z6", "Z7"].map((zona, indexZona) => {
        const el = {zona}

        eventi.forEach((week, index) => {

            if(week.ciclismo) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=week.ciclismo.tempoZone["zona"+(indexZona+1)]
            }
        })

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
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
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

    const listaZoneGrafico = ["A1", "A2", "B1", "B2", "C1", "C2", "C3", "D"].map((zona, indexZona) => {
        const el = {zona}

        eventi.forEach((week, index) => {
            
            if(week.nuoto) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=week.nuoto.tempoZone["zona"+(indexZona+1)]
            }
        })

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
                <Legend />
                {eventi.map((week, index) => week.nuoto ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriNuoto[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const CiclTrimp = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["aerobic", "mixed", "anaerobic"].map(zona => {
        const el = {zona}

        eventi.forEach((week, index) => {
            let tipoTrimp = null
            if(zona==="aerobic") {
                tipoTrimp = weekCicl => weekCicl.trimpCiclAerobic
            } else if(zona==="mixed") {
                tipoTrimp = weekCicl => weekCicl.trimpCiclMixed
            } else if(zona==="anaerobic") {
                tipoTrimp = weekCicl => weekCicl.trimpCiclAnaerobic
            }

            if(week.ciclismo) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=Number(tipoTrimp(week.ciclismo).toFixed(2))
            }
        })

        return el
    })

    const listaColoriCicl = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis /* domain={['dataMin', 'dataMax + 60']} */ />
                <Tooltip />
                <Legend />
                {eventi.map((week, index) => week.ciclismo ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriCicl[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const CorsaTrimp = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["aerobic", "mixed", "anaerobic"].map(zona => {
        const el = {zona}

        eventi.forEach((week, index) => {
            let tipoTrimp = null
            if(zona==="aerobic") {
                tipoTrimp = weekCorsa => weekCorsa.trimpCorsaAerobic
            } else if(zona==="mixed") {
                tipoTrimp = weekCorsa => weekCorsa.trimpCorsaMixed
            } else if(zona==="anaerobic") {
                tipoTrimp = weekCorsa => weekCorsa.trimpCorsaAnaerobic
            }

            if(week.corsa) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=Number(tipoTrimp(week.corsa).toFixed(2))
            }
        })

        return el
    })

    const listaColoriCorsa = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis />
                <Tooltip />
                <Legend />
                {eventi.map((week, index) => week.corsa ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriCorsa[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const NuotoTrimp = props => {
    const { eventi } = props

    const { t, i18n } = useTranslation()

    const listaZoneGrafico = ["aerobic", "mixed", "anaerobic"].map(zona => {
        const el = {zona}

        eventi.forEach((week, index) => {
            let tipoTrimp = null
            if(zona==="aerobic") {
                tipoTrimp = weekNuoto => weekNuoto.trimpNuotoAerobic
            } else if(zona==="mixed") {
                tipoTrimp = weekNuoto => weekNuoto.trimpNuotoMixed
            } else if(zona==="anaerobic") {
                tipoTrimp = weekNuoto => weekNuoto.trimpNuotoAnaerobic
            }

            if(week.nuoto) {
                el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=Number(tipoTrimp(week.nuoto).toFixed(2))
            }
        })

        return el
    })

    const listaColoriNuoto = ["#0c3953", "#094c72", "#0079bf", "#298fca", "#5ba4cf", "#8bbdd9", "#bcd9ea"]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" />
                <YAxis />
                <Tooltip />
                <Legend />
                {eventi.map((week, index) => week.nuoto ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColoriNuoto[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const Wlt = props => {
    const { eventi, tipo } = props

    const { t, i18n } = useTranslation()

    let tipoProp = null
    let tipoWlt = null
    let listaColori = null
    if(tipo==="cicl") {
        tipoProp = week => week.ciclismo
        listaColori = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]
        tipoWlt = tipoProp => tipoProp.wltWorkoutTot
    } else if(tipo==="corsa") {
        tipoProp = week => week.corsa
        listaColori = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]
        tipoWlt = tipoProp => tipoProp.wltCorsa
    } else if(tipo==="nuoto") {
        tipoProp = week => week.nuoto
        listaColori = ["#0c3953", "#094c72", "#0079bf", "#298fca", "#5ba4cf", "#8bbdd9", "#bcd9ea"]
        tipoWlt = tipoProp => tipoProp.wltNuoto
    }

    const el = {}
    eventi.forEach((week, index) => {

        if(tipoProp(week)) {
            el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=Math.round(tipoWlt(tipoProp(week))*100)/100
        }

    })

    const listaZoneGrafico = [el]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="niente" />
                <YAxis />
                <Tooltip />
                <Legend />
                {eventi.map((week, index) => tipoProp(week) ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColori[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

const Wls = props => {
    const { eventi, tipo } = props

    const { t, i18n } = useTranslation()

    let tipoProp = null
    let tipoWlt = null
    let listaColori = null
    if(tipo==="cicl") {
        tipoProp = week => week.ciclismo
        listaColori = ["#063b00", "#607c3c", "#809c13", "	#abc32f", "#b5e550", "#ececa3", "#b7ffbf"]
        tipoWlt = tipoProp => tipoProp.wlsWorkoutTot
    } else if(tipo==="corsa") {
        tipoProp = week => week.corsa
        listaColori = ["#190000", "#330000", "#4d0000", "#800000", "#b30000", "#e60000", "#ff0000"]
        tipoWlt = tipoProp => tipoProp.wlsCorsa
    } else if(tipo==="nuoto") {
        tipoProp = week => week.nuoto
        listaColori = ["#0c3953", "#094c72", "#0079bf", "#298fca", "#5ba4cf", "#8bbdd9", "#bcd9ea"]
        tipoWlt = tipoProp => tipoProp.wlsNuoto
    }

    const el = {}
    eventi.forEach((week, index) => {

        if(tipoProp(week)) {
            el[t('esporta:report:tab-dati-week:settimana')+" "+(index+1)]=Math.round(tipoWlt(tipoProp(week))*100)/100
        }

    })

    const listaZoneGrafico = [el]

    return (
        <ResponsiveContainer width="100%" height={280} /* aspect={16/9} */ >
            <BarChart data={listaZoneGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="niente" />
                <YAxis />
                <Tooltip />
                <Legend />
                {eventi.map((week, index) => tipoProp(week) ? <Bar dataKey={t('esporta:report:tab-dati-week:settimana')+" "+(index+1)} fill={listaColori[index]} /> : null)}
            </BarChart>
        </ResponsiveContainer>
    )
}

export { CiclTempoZone, CorsaTempoZone, NuotoTempoZone, CiclTrimp, CorsaTrimp, NuotoTrimp, Wlt, Wls }

