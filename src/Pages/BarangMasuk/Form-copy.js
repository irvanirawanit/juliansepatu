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
    }
}));

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Home',
            isLoaded: false,
            items: [],
            rows: []
        };
        this.formsubmit = this
            .formsubmit
            .bind(this);
    }
    render() {
        return (
            <div className={classes.root}>
                <Paper elevation={1} variant="outlined">
                    <form
                        onSubmit={props.formsubmit}
                        autoComplete="off"
                        className={classes.boxpadding}>
                        <FormControl fullWidth={true} className={classes.margin}>
                            <RadioGroup row="row" aria-label="position" name="barang" defaultValue="top">
                                <FormControlLabel
                                    value="nike"
                                    control={<Radio color = "primary" />}
                                    label="Nike"
                                    labelPlacement="top"/>
                                <FormControlLabel
                                    value="wakai"
                                    control={<Radio color = "primary" />}
                                    label="Wakai"
                                    labelPlacement="top"/>
                                <FormControlLabel
                                    value="adidas"
                                    control={<Radio color = "primary" />}
                                    label="Adidas"
                                    labelPlacement="top"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth={true} className={classes.formcontrolpadding}>
                            <TextField
                                id="filled-number"
                                label="Jumlah"
                                variant="outlined"
                                type="number"
                                name="jumlah"/>
                        </FormControl>
                        <FormControl className={classes.formcontrolpadding}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </FormControl>
                    </form>
                </Paper>
            </div>
        )
    }
}