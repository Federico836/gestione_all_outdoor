const mediaProprieta = (lista, nomeProp) => lista.reduce((a, b) => a+b[nomeProp], 0)/lista.length

export default mediaProprieta