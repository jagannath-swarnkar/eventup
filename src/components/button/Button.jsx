import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const {color, variant, label, ...other} = props;

  return (
    // <div className={classes.root}>
      <MuiButton 
        color={color || "primary"}
        variant={variant || "contained"}
        {...other}>
          {label || props.children}
      </MuiButton>
    // </div>
  );
}

export default Button;