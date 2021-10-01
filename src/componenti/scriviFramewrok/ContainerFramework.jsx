import React from "react"
import { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link as MaterialLink } from "react-router-dom"
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink } from 'react-router-dom'

import Ciclismo from "./ciclismo/Ciclismo.jsx"
import Corsa from "./Corsa.jsx"
import Nuoto from "./Nuoto.jsx"

import styles from './ContainerFramework.module.css'
import { useTranslation } from 'react-i18next'


const ContainerFramework = (props) => {
    const { setPagina } = props
    
    const [open, setOpen] = useState(false)
    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.bottoniIndietroMenu}>
                <Button variant="contained" className={styles.bottoneApriMenu} onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
                <Button variant="contained" className={styles.bottoneApriMenu} onClick={() => setOpen(!open)}>menu</Button>
            </div>
            <div className={styles.containerTabFramework}>
                <Router>
                    <div>
                        <Drawer anchor={"left"} open={open} onClose={() => setOpen(!open)} >
                            <List className={styles.linkLista}>
                                <ListItem button component={RouterLink} to='/' key={"Ciclismo"}>
                                    <ListItemIcon>
                                        <ListItemText primary={"Ciclismo"} />
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/corsa' key={"Corsa"}>
                                    <ListItemIcon>
                                        <ListItemText primary={"Corsa"} /> 
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem button component={RouterLink} to='/nuoto' key={"Nuoto"}>
                                    <ListItemIcon>
                                        <ListItemText primary={"Nuoto"} />
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
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default ContainerFramework
