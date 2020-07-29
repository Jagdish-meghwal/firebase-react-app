import React from 'react'

import { withRouter,Link } from 'react-router-dom'

import {db} from '../firebase'
import { Typography, Paper, Button } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},

	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

class Alluser extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state={
   
            users:null
            };
        //const { classes } = props    
    }
    
    componentDidMount(){
        db.collection('userdata')
          .get()
          .then( snapshot=>{
              const users=[]
              snapshot.forEach(doc=>{
                  const data=doc.data()
                  users.push(data)
              })
              this.setState({
                  users:users
              })


          }) 
          .catch(error=>error) 

    }
    render(){
        const classes  = this.props;
        return(
         
            <main className={classes.main}>
                

                {
                    this.state.users &&
                    this.state.users.map(user=>{
                        return (
                            <Typography component="h1" > 
                                {user.name}
                             </Typography>   
                        )
                    })
                }

                
            </main>
          
        )
    }
}

export default withRouter(withStyles(styles)(Alluser))