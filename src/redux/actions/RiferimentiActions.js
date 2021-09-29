
const setNuotoPasso100 = (valore) => {
  return {type: 'SET_NUOTO_PASSO_100', payload: valore}
}

const setCiclismoFtp = (valore) => {
  return {type: 'SET_CICLISMO_FTP', payload: valore}
}
const setCiclismoFc = (valore) => {
  return {type: 'SET_CICLISMO_FC', payload: valore}
}

const setCorsaPasso1000 = (valore) => {
  return {type: 'SET_CORSA_FTP', payload: valore}
}
const setCorsaFc = (valore) => {
  return {type: 'SET_CORSA_FC', payload: valore}
}

export default {
  setNuotoPasso100,
  setCiclismoFtp,
  setCiclismoFc,
  setCorsaPasso1000,
  setCorsaFc
}
