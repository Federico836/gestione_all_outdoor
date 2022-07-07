import React from "react"
import DropdownTipoTest from "./dropdownMenu/DropdownTipoTest"

const ContainerMenuSelect = props => {
    const { listaTipiTest, tipoTest, setTipoTest } = props

    return (
        <div>
            <DropdownTipoTest listaTipiTest={listaTipiTest} tipoTest={tipoTest} setTipoTest={setTipoTest} />
        </div>
    )
}

export default ContainerMenuSelect
