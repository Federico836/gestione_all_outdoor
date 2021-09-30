const scambioElementiArray = (lista, oldIndex, newIndex) => {
    if(oldIndex === newIndex) return lista

    const listaCopia = [...lista]
    const temp = listaCopia[oldIndex]
    listaCopia[oldIndex] = listaCopia[newIndex]
    listaCopia[newIndex] = temp

    return listaCopia
}

export { scambioElementiArray }