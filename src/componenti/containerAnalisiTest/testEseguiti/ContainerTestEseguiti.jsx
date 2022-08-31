import React from "react"
import BottoniTop from "./bottoniTop/BottoniTop"

const ContainerTestEseguiti = props => {

    const { setTestEseguiti } = props

    return (
        <div>
            <BottoniTop setTestEseguiti={setTestEseguiti} />
        </div>
    )
}

export default ContainerTestEseguiti