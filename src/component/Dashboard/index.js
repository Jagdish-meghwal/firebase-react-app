import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Avatar, Typography, Button,Paper, CircularProgress } from '@material-ui/core'
import { VerifiedUserOutlined } from '@material-ui/icons'
import firebase from '../firebase'
import HomePage from '../HomePage'
const styles= theme=>({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit*3,
        marginRight: theme.spacing.unit*3,
        [theme.breakpoints.up(400+theme.spacing.unit*3*2)]:{
            width: 400,
            marginLeft:'auto',
            marginRight:'auto',
        },
    },
    paper:{
        marginTop:theme.spacing.unit*8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:`${theme.spacing.unit*2}px ${theme.spacing.unit*3}px ${theme.spacing.u
        *4}px`,
    },
    avatar:{
        margin:theme.spacing.unit,
        backgroundColor:theme.palette.secondary.main,
    },
    submit:{
        marginTop:theme.spacing.unit*3,
    }
})

function Dashboard(props){
    
    const {classes} =props


   
        if(!firebase.getCurrentUsername()){
            alert("please login first ")
            props.history.replace('/login')
            
        }

   
    
    return(
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Hello {firebase.getCurrentUsername()}
              
                </Typography>
              
                <Typography component="h1" variant="h5">
                    Welcome in Dashboard
              
                </Typography>
              
                <Button
                   type="submit"
                   fullWidth
                   onClick={logout}
                   variant="contained"
                   color="secondary"
                   className={classes.submit}>
                    logout
                </Button>
            </Paper>
        </main>
    );
    async function logout(){
        await firebase.logout()
        props.history.push('/')
    }
}
export default withStyles(styles)(Dashboard);