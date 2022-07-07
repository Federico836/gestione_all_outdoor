import React from "react"
import DropdownTipoTest from "./dropdownMenu/DropdownTipoTest"
import DropdownListaTest from "./dropdownMenu/DropdownListaTest"

const ContainerMenuSelect = props => {
    const { listaTipiTest, tipoTest, setTipoTest, listaPunti, puntiSelected, setPuntiSelected } = props

    return (
        <div>
            <DropdownTipoTest listaTipiTest={listaTipiTest} tipoTest={tipoTest} setTipoTest={setTipoTest} />
            <DropdownListaTest listaPunti={listaPunti} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected} />
        </div>
    )
}

export default ContainerMenuSelect
