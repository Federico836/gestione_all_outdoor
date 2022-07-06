import React, { useState, useEffect } from "react"
import { MemoryRouter as Router, Switch, Route, Link as MaterialLink } from "react-router-dom"
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ContainerCorsa from "./corsa/ContainerCorsa"
import ContainerNuoto from "./nuoto/ContainerNuoto"
import styles from "./ContainerComparaTest.module.css"

const ContainerComparaTest = props => {
    const { setPagina } = props

    const [open, setOpen] = useState(false)
    const [listaTest, setListaTest] = useState([])

    const { t, i18n } = useTranslation()

    useEffect(function richiediTestEseguiti() {
        setListaTest([])
    }, [])

    return (
        <div className={styles.container}>
            <Router>
                <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
                    <List className={styles.linkLista} style={{marginTop: "152px"}}>

                        <ListItem button component={RouterLink} to='/' key={"Corsa"}>
                            <ListItemIcon>
                                <ListItemText primary={t('scrivi-framework:corsa:corsa')} /> 
                            </ListItemIcon>
                        </ListItem>

                        <ListItem button component={RouterLink} to='/nuoto' key={"Nuoto"}>
                            <ListItemIcon>
                                <ListItemText primary={t('scrivi-framework:nuoto:nuoto')} />
                            </ListItemIcon>
                        </ListItem>

                    </List>
                </Drawer>

                <Switch>

                    <Route exact path="/">
                        <ContainerCorsa setPagina={setPagina} open={open} setOpen={setOpen}
                        listaTest={listaTest.filter(test => test.tipoSport==="corsa")} />
                    </Route>

                    <Route path="/nuoto">
                        <ContainerNuoto setPagina={setPagina} open={open} setOpen={setOpen}
                        listaTest={listaTest.filter(test => test.tipoSport==="nuoto")} />
                    </Route>

                </Switch>
            </Router>
        </div>
    )
}

export default ContainerComparaTest
