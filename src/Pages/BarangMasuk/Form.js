import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    boxpadding: {
        padding: theme.spacing(2)
    },
    formcontrolpadding: {
        padding: theme.spacing(1)
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    }
}));

export default function Form(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper elevation={1} variant="outlined">
                <form onSubmit={props.formsubmit} autoComplete="off" className={classes.boxpadding}>
                    <FormControl required fullWidth={true} className={classes.margin}>
                        <RadioGroup required row="row" aria-label="position" name="barang" defaultValue="top" value={props.radiovalue}>
                            <FormControlLabel
                                value="nike"
                                control={<Radio onClick={props.radioklik} color="primary" required />}
                                label="Nike"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="wakai"
                                control={<Radio onClick={props.radioklik} color="primary" required />}
                                label="Wakai"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="adidas"
                                control={<Radio onClick={props.radioklik} color="primary" required />}
                                label="Adidas"
                                labelPlacement="top"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth={true} className={classes.formcontrolpadding}>
                        <TextField required id="filled-number" label="Jumlah" variant="outlined" type="number" name="jumlah"/>
                    </FormControl>
                    <FormControl className={classes.formcontrolpadding}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={props.proses}
                            className={classes.button}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>
                        {props.proses && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
}
