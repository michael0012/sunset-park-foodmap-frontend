import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import MaskedInput from 'react-text-mask';

const TextMaskCustom = (props) => {
	const { inputRef, touched, ...other } = props;

	return (
		<MaskedInput
		{...other}
		ref={(ref) => {
			inputRef(ref ? ref.inputElement : null);
		}}
		mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
		placeholderChar={'\u2000'}
		showMask={touched}
		/>
	);
};

const useStyles = makeStyles((theme) => ({
    gridSpace:{
        paddingTop: 10,
        paddingBottom: 10, 
    },
    error:{
        color:"#f44336",
    },
    errorIcon:{
        marginRight: "2px",
        position: "relative",
        top: "5px",
    },
}));

const PhoneNumberInput = (props) => {

	const classes = useStyles();
	const { multiline, rows} = props;
    let extras = {};
    if(multiline !== undefined)
        extras = {multiline, rows};
	return (
		<Grid container justify="center" alignItems="center" className={classes.gridSpace}>
			<Grid item xs={12} sm={10} md={9}>
				<TextField {...extras} InputProps={{inputComponent: TextMaskCustom}} id={`outlined-adornment-${props.name}`} name={props.name} required={props.required} type={props.type} label={props.label} variant="outlined" fullWidth error={props.touched[props.name] && Boolean(props.errors[props.name])} value={props.values[props.name]} onChange={props.handleChange} onBlur={props.handleBlur}/>
				{props.touched[props.name] && props.errors[props.name] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[props.name]}</Typography></React.Fragment>}
			</Grid>
		</Grid>
	);
};
export default PhoneNumberInput;