import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import QRCode from "react-qr-code";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactToPrint from "react-to-print";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from '@material-ui/core/colors';

export default class Tabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogopen: false,
            dialogopendua: false,
            nobarang: '20201210sku10',
            detailbarang: []
        };
        this.handleClickOpen = this
            .handleClickOpen
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleClickOpenDialogDua = this
            .handleClickOpenDialogDua
            .bind(this);
    }
    handleClickOpenDialogDua = (val) => {
        this.setState({dialogopendua: true,nobarang:'berubah'});
        fetch('http://localhost:3001/api/barangmasuk/20201210sku10')
            .then(
                (response) => response.json()
            )
            .then((data) => {
              console.log(data);
                this.setState({rows: data});
            });
    };
    handleClickOpen = (val) => {
        this.setState({nobarang: val});
        this.setState({dialogopen: true});
    };
    handleClose = () => {
        this.setState({dialogopendua: false});
    };
    render() {
        return (
            <Box component="span" m={1}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Tanggal Keluar</TableCell>
                                <TableCell>Kode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this
                                    .props
                                    .rows
                                    .map((row) => (
                                        <TableRow key={row.BarangKeluarId}>
                                            <TableCell>{row.barang_masuk.NamaBarang}</TableCell>
                                            <TableCell>{row.Jumlah}</TableCell>
                                            <TableCell>{row.created_at}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={this
                                                        .handleClickOpen
                                                        .bind(this, row.barang_masuk.NoBarang)}>
                                                    Code
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={this.handleClickOpenDialogDua.bind(this,'20201210sku10')}>
                                                    Tes
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={this.state.dialogopendua}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText>
                            <ComponentKontenDialog tes={this.state.nobarang}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus="autoFocus">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.dialogopen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText>
                            <QRCode value={this.state.nobarang}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            <ReactToPrint
                                trigger={() => <a href="#">Print</a>}
                                content={() => this.componentRef}/>
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus="autoFocus">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <div style={{
                        display: "none"
                    }}>
                    <ComponentToPrint
                        ref={(el) => (this.componentRef = el)}
                        nobarang={this.state.nobarang}/>
                </div>
            </Box>
        );
    }
}

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ukuran: localStorage.getItem('ukuranqrcode') || 128,
            jumlahqrcode: 20,
            jumlahx: []
        };
    }

    componentDidMount = () => {
        this.listData();
    }

    listData = () => {
        let arr = []
        for (let i = 1; i <= this.state.jumlahqrcode; i++) {
            arr.push(i)
        }
        this.setState({jumlahx: arr})
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.jumlahx.map((key, i) => (
                                <span
                                    style={{
                                        marginTop: 10,
                                        padding: 10
                                    }}
                                    key={i}><QRCode
                                    bgColor={'#FFFFFF'}
                                    fgColor={'#000000'}
                                    size={this.state.ukuran}
                                    value={this.props.nobarang}/></span>
                            ))
                    }

                </div>
            </div>
        );
    }
}

class ComponentKontenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proses: false,
            data: 'kosong',
            rows: []
        };
    }

    componentDidMount = () => {
      console.log(this.props.tes);
      this.setState({data: this.props.tes});
      fetch('http://localhost:3001/api/barangmasuk/'+this.props.tes)
            .then(
                (response) => response.json()
            )
            .then((data) => {
              console.log(data);
                this.setState({rows: data});
            });
    }

    radioklik = () => {
        // this.setState({dialogopendua: false});
    };

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Tanggal Masuk</TableCell>
                                <TableCell>Kode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell>tes</TableCell>
                                <TableCell>tes</TableCell>
                                <TableCell>tes</TableCell>
                                <TableCell>tes</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <form autoComplete="off">
                    <FormControl required="required" fullWidth={true}>
                        <RadioGroup
                            required="required"
                            row="row"
                            aria-label="position"
                            name="barang"
                            defaultValue="top">
                            <FormControlLabel
                                value="lazada"
                                control={<Radio onClick = {
                                    this.radioklik
                                }
                                color = "primary" required />}
                                label="Lazada"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="shopee"
                                control={<Radio onClick = {
                                    this.radioklik
                                }
                                color = "primary" required />}
                                label="Shopee"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="tokopedia"
                                control={<Radio onClick = {
                                    this.radioklik
                                }
                                color = "primary" required />}
                                label="Tokopedia"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="bukalapak"
                                control={<Radio onClick = {
                                    this.radioklik
                                }
                                color = "primary" required />}
                                label="Bukalapak"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="lainnya"
                                control={<Radio onClick = {
                                    this.radioklik
                                }
                                color = "primary" required />}
                                label="Lainnya"
                                labelPlacement="top"/>
                        </RadioGroup>
                    </FormControl>
                    <br/>
                              <div>.{this.state.data}</div>
                    <FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={this.state.proses}
                            startIcon={<SaveIcon />}>
                            Submit
                        </Button>
                        {this.state.proses && <CircularProgress size={24}/>}
                    </FormControl>
                </form>
            </div>
        );
    }
}