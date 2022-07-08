import React from "react"
import DropdownTipoTest from "./dropdownMenu/DropdownTipoTest"
import DropdownListaTest from "./dropdownMenu/DropdownListaTest"
import MenuPuntiSelected from "./menuPuntiSelected/MenuPuntiSelected"

const ContainerMenuSelect = props => {
    const { listaTipiTest, tipoTest, setTipoTest, listaPunti, puntiSelected, setPuntiSelected } = props

    return (
        <div>
            <DropdownTipoTest listaTipiTest={listaTipiTest} tipoTest={tipoTest} setTipoTest={setTipoTest} />
            <DropdownListaTest listaPunti={listaPunti} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected} />
            <MenuPuntiSelected puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected} />
        </div>
    )
}

export default ContainerMenuSelect
