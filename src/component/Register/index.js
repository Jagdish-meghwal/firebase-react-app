import React, { useState } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import { CssBaseline } from '@material-ui/icons/VerifiedUserOutlined'
import { Link, Redirect } from 'react-router-dom'
import { Avatar, Typography, Button,Paper,FormControl,Input,InputLabel } from '@material-ui/core'
import { VerifiedUserOutlined } from '@material-ui/icons'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import firebase from '../firebase'
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
function Register(props){
    const {classes} =props

    const [name,setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    
    return(
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register Account
                </Typography>
                <form className={ classes.form } onSubmit={e=>e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name"  autoComplete="off" autoFocus value={name} onChange={e=>setName(e.target.value)}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel> 
                        <Input id="email" name="email"  autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type="password" id="password" name="password" autoComplete="off" value={password} onChange={e=>setPassword(e.target.value)}/>
                    </FormControl>
                    
                </form>
                <Button
                   type="submit"
                   fullWidth
                   onClick={onRegister}
                   variant="contained"
                   color="primary"
                   className={classes.submit}>
                   Register
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/login"
                    className={classes.submit}>
                    Login
                </Button>
            </Paper>
        </main>
    );
    async function onRegister(){
        try{
            await firebase.register(name,email,password);
            //await firebase.addQuote(quote); 
            props.history.replace('/dashboard');
        }
        catch(error){
            alert(error.message)
        }
    }
    
}
export default withStyles(styles)(Register);