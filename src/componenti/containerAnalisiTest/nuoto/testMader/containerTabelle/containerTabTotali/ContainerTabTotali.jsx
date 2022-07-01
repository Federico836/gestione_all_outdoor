import React from "react"
import TabTotali from "./TabTotali"
import styles from "./ContainerTabTotali.module.css"

const ContainerTabTotali = props => {
    const { lattatoTabTotali, setLattatoTabTotali, tabTotali } = props

    return (
        <div className={styles.container}>
            <TabTotali lattatoTabTotali={lattatoTabTotali} setLattatoTabTotali={setLattatoTabTotali} tabTotali={tabTotali} />
        </div>
    )
}

export default ContainerTabTotali
