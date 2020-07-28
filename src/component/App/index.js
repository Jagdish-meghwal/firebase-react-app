import React, { useState, useEffect } from 'react'

import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import firebase from '../firebase' 
import AllUser from '../AllUser'
const theme = createMuiTheme();

 export default function App(){
     const [firebseInitialized,setFirebaseInitialized]=useState(false)
     useEffect(()=>{
         firebase.isInitialized().then(val=>{
             setFirebaseInitialized(val)
         })
     })
    return setFirebaseInitialized!==false?(
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/alluser" component={AllUser}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    ):<div id="loader"><CircularProgress/> </div>
 }