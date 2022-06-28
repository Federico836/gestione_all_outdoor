import PolynomialRegression from '../../polynomialRegression/PolynomialRegression'
import { toMMSS } from '../../funzioni'

const calcPolyReg = (puntiSelected, nomeProp, lattatoTabTotali, grado) => {
    const dati = puntiSelected.map(riga => ({x: riga.lattato, y: riga[nomeProp]}))

    const model = PolynomialRegression.read(dati, grado)
    const terms = model.getTerms()

    return {
        val1: model.predictY(terms, lattatoTabTotali.lattato1),
        val2: model.predictY(terms, lattatoTabTotali.lattato2)
    }
}

const trovaGlicemiaO2RPE = (puntiSelected, velKmh1, velKmh2) => {
    const lista1 = puntiSelected.filter(riga => riga.velKmh<=velKmh1)
    const lista2 = puntiSelected.filter(riga => riga.velKmh<=velKmh2)

    const riga1 = lista1.length>0 ? lista1[lista1.length-1] : {}
    const riga2 = lista2.length>0 ? lista2[lista2.length-1] : {}

    return {
        glicemia1: riga1.glicemia,
        glicemia2: riga2.glicemia,
        o21: riga1.o2,
        o22: riga2.o2,
        rpe1: riga1.rpe,
        rpe2: riga2.rpe
    }
}

const calcTabTotali = (puntiSelected, lattatoTabTotali, grado) => {
    const velKmh = calcPolyReg(puntiSelected, "velKmh", lattatoTabTotali, grado)
    const velMs = {val1: velKmh.val1/3.6, val2: velKmh.val2/3.6}
    const passo1000 = {val1: 1000/velMs.val1, val2: 1000/velMs.val2}
    /* const heartrate = calcPolyReg(puntiSelected, "heartrate", lattatoTabTotali, grado) */
    const glicemiaO2Rpe = trovaGlicemiaO2RPE(puntiSelected, velKmh.val1, velKmh.val2)

    return {
        velKmh1: isFinite(velKmh.val1) && lattatoTabTotali.lattato1!=="" ? Math.round(velKmh.val1*10)/10 : "",
        velKmh2: isFinite(velKmh.val2) && lattatoTabTotali.lattato2!=="" ? Math.round(velKmh.val2*10)/10 : "",
        velMs1: isFinite(velMs.val1) && lattatoTabTotali.lattato1!=="" ? Math.round(velMs.val1*10)/10 : "",
        velMs2: isFinite(velMs.val2) && lattatoTabTotali.lattato2!=="" ? Math.round(velMs.val2*10)/10 : "",
        passo10001: isFinite(passo1000.val1) && lattatoTabTotali.lattato1!=="" ? toMMSS(passo1000.val1) : "",
        passo10002: isFinite(passo1000.val2) && lattatoTabTotali.lattato2!=="" ? toMMSS(passo1000.val2) : "",
        /* heartrate1: isFinite(heartrate.val1) && lattatoTabTotali.lattato1!=="" ? Math.round(heartrate.val1*10)/10 : "",
        heartrate2: isFinite(heartrate.val2) && lattatoTabTotali.lattato2!=="" ? Math.round(heartrate.val2*10)/10 : "", */
        glicemia1: isFinite(glicemiaO2Rpe.glicemia1) && lattatoTabTotali.lattato1!=="" ? glicemiaO2Rpe.glicemia1 : "",
        glicemia2: isFinite(glicemiaO2Rpe.glicemia2) && lattatoTabTotali.lattato2!=="" ? glicemiaO2Rpe.glicemia2 : "",
        o21: isFinite(glicemiaO2Rpe.o21) && lattatoTabTotali.lattato1!=="" ? glicemiaO2Rpe.o21 : "",
        o22: isFinite(glicemiaO2Rpe.o22) && lattatoTabTotali.lattato2!=="" ? glicemiaO2Rpe.o22 : "",
        rpe1: isFinite(glicemiaO2Rpe.rpe1) && lattatoTabTotali.lattato1!=="" ? glicemiaO2Rpe.rpe1 : "",
        rpe2: isFinite(glicemiaO2Rpe.rpe2) && lattatoTabTotali.lattato2!=="" ? glicemiaO2Rpe.rpe2 : ""
    }
}

export default calcTabTotali
