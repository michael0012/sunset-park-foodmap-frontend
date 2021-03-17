import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade'; 


const useStyles = makeStyles(( theme ) => ({
    selectionModal:{
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        left: '0px',
        top: '0px',
        minWidth: '100vw',
        minHeight: '100vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)',
        '&:hover':{
            'cursor': "pointer"
        }
    },
    selectionModalContent:{
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
    },
    
}));

const FormModalBase = (props) => {
    const classes = useStyles();
    return(
        <Fade in={props.fadeIn}>
            <div id="baseModal" className={classes.selectionModal} onClick={(e)=>{
                if(e.target.id === "baseModal"){
                    e.preventDefault();
                    props.onClick();
                }
            }}>
                {props.children}
            </div>
        </Fade>
    );
}

export default FormModalBase;
