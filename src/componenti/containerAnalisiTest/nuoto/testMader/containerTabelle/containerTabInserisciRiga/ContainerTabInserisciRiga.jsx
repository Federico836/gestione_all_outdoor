import React from "react"
import TabInserisciRiga from "./TabInserisciRiga"
import BottoneAddRiga from "./BottoneAddRiga"
import styles from "./ContainerTabInserisciRiga.module.css"

const ContainerTabInserisciRiga = props => {
    const { puntoCliccato, setPuntoCliccato, puntiSelected, setPuntiSelected, modificaRiga, setModificaRiga } = props

    return (
        <div className={styles.container}>
            <TabInserisciRiga puntoCliccato={puntoCliccato} setPuntoCliccato={setPuntoCliccato} />
            <BottoneAddRiga puntoCliccato={puntoCliccato} puntiSelected={puntiSelected} setPuntiSelected={setPuntiSelected}
            modificaRiga={modificaRiga} setModificaRiga={setModificaRiga} />
        </div>
    )
}

export default ContainerTabInserisciRiga