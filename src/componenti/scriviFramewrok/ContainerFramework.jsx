import React from "react"
import { useState } from "react"
import { MemoryRouter as Router, Switch, Route, Link as MaterialLink } from "react-router-dom"
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink } from 'react-router-dom'

import Ciclismo from "./ciclismo/Ciclismo.jsx"
import Corsa from "./corsa/Corsa.jsx"
import Nuoto from "./nuoto/Nuoto.jsx"
import Palestra from "./palestra/Palestra.jsx"
import CombinatiTri from "./combinatiTri/CombinatiTri.jsx"
import Sport from "./sport/Sport.jsx"
import Gara from "./gara/Gara.jsx"

import styles from './ContainerFramework.module.css'
import { useTranslation } from 'react-i18next'


const ContainerFramework = props => {
    const { setPagina, utente } = props
    
    const [open, setOpen] = useState(false)
    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.bottoniIndietroMenu}>
                <Button variant="contained" onClick={() => setPagina("modifica")}>{t('modifica-framework:modifica')}</Button>
                <Button variant="contained" onClick={() => setOpen(!open)}>menu</Button>
                {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}
            </div>
            <div className={styles.containerTabFramework}>
                <Router>
                    <div>
                        <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
                            <List className={styles.linkLista} style={{marginTop: "152px"}}>
                                <ListItem button component={RouterLink} to='/' key={"Ciclismo"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:ciclismo:ciclismo')} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/corsa' key={"Corsa"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:corsa:corsa')} /> 
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/nuoto' key={"Nuoto"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:nuoto:nuoto')} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/palestra' key={"Palestra"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:palestra:palestra')} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/combinatiTriathlon' key={"Combinati"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:combinati-tri:combinati-tri')} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/sport' key={"Sport"}>
                                    <ListItemIcon>
                                        <ListItemText primary={"Sport"} />
                                    </ListItemIcon>
                                </ListItem>
                                <ListItem button component={RouterLink} to='/gara' key={"Gara"}>
                                    <ListItemIcon>
                                        <ListItemText primary={t('scrivi-framework:gara:gara')} />
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </Drawer>

                        <Switch>
                            <Route exact path="/">
                                <Ciclismo />
                            </Route>
                            <Route path="/corsa">
                                <Corsa />
                            </Route>
                            <Route path="/nuoto">
                                <Nuoto />
                            </Route>
                            <Route path="/palestra">
                                <Palestra />
                            </Route>
                            <Route path="/combinatiTriathlon">
                                <CombinatiTri />
                            </Route>
                            <Route path="/sport">
                                <Sport />
                            </Route>
                            <Route path="/gara">
                                <Gara />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default ContainerFramework
