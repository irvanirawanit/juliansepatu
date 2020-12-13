import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
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
// import DialogTitle from '@material-ui/core/DialogTitle';
import ReactToPrint from "react-to-print";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
// import {green} from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Tabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogopen: false,
            dialogopendua: false,
            nobarang: '20201210sku10',
            detailbarang: []
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenDialogDua = this.handleClickOpenDialogDua.bind(this);
    }
    handleClickOpenDialogDua = (val) => {
        this.setState({dialogopendua: true, nobarang: 'berubah'});
        fetch('http://localhost:3001/api/barangmasuk/20201210sku10').then((response) => response.json()).then((data) => {
            this.setState({rows: data});
        });
    };
    handleClickOpen = (val) => {
        this.setState({nobarang: val});
        this.setState({dialogopen: true});
    };
    handleClose = () => {
        this.setState({dialogopen: false});
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
                                <TableCell>Toko</TableCell>
                                <TableCell>Kode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this
                                .props
                                .rows
                                .map((row) => (
                                    <TableRow key={row.BarangKeluarId}>
                                        <TableCell>{row.barang_masuk.NamaBarang}</TableCell>
                                        <TableCell>{row.Jumlah}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                        <TableCell>{row.toko}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={this
                                                .handleClickOpen
                                                .bind(this, row.barang_masuk.NoBarang)}>
                                                Code
                                            </Button>
                                            {/* <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={this
                                                .handleClickOpenDialogDua
                                                .bind(this, '20201210sku10')}>
                                                Tes
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                ))
}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={this.props.dialogopendua}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText>
                            {
                                this.props.dialogopendualoading == false ?
                                <ComponentKontenDialog submitBarangKeluar={this.props.submitBarangKeluar} detailbarang={this.props.detailbarang}/>
                                :
                                // <div>Loading...</div>
                                // <Backdrop open={true}>
                                    <CircularProgress color="inherit" />
                                // </Backdrop>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClosedialogopendua} color="primary" autoFocus="autoFocus">
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

class ComponentKontenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proses: false,
            data: 'kosong',
            rows: [],
            dialogopen: false,
            nobarang: 'salah',
            dialogopen: false,
            toko: 0
        };
        this.handleClose = this
            .handleClose
            .bind(this);
        this.submitBarangKeluar = this
            .submitBarangKeluar
            .bind(this);
    }

    componentDidMount = () => {
        console.log('ComponentKontenDialog');
        console.log(this.props.detailbarang);
        this.setState({proses: false});
    }

    handleClickOpen = (val) => {
        this.setState({nobarang: val});
        this.setState({dialogopen: true});
    };
    handleClose = () => {
        this.setState({dialogopen: false});
    };

    radioklik = (e) => {
        console.log(e.target.value);
        this.setState({toko: e.target.value});
    };

    submitBarangKeluar(){
        if (this.state.toko == 0) {
            alert('Toko Belum dipilih.');
        }else{
            console.log(this.state.toko);
            this.props.submitBarangKeluar(this.state.toko);
            this.setState({proses: true});
        }
    }
    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell>Stok</TableCell>
                                <TableCell>Tanggal Masuk</TableCell>
                                <TableCell>Kode</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell>{this.props.detailbarang.NamaBarang}</TableCell>
                                <TableCell>{this.props.detailbarang.Jumlah - (this.props.detailbarang.barang_keluar_count != null
                                        ? this.props.detailbarang.barang_keluar_count
                                        : 0) + (this.props.detailbarang.barang_return_count != null
                                        ? this.props.detailbarang.barang_return_count
                                        : 0)}</TableCell>
                                <TableCell>{this.props.detailbarang.created_at}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={this
                                        .handleClickOpen
                                        .bind(this, this.props.detailbarang.NoBarang)}>
                                        Code
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                {/* <form onSubmit={this.props.submitBarangKeluar} autoComplete="off"> */}
                    <FormControl required="required" fullWidth={true}>
                        <RadioGroup
                            required="required"
                            row="row"
                            aria-label="position"
                            name="barang"
                            defaultValue="top">
                            <FormControlLabel
                                value="lazada"
                                control={< Radio onClick = {
                                this.radioklik
                            }
                            color = "primary" required />}
                                label="Lazada"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="shopee"
                                control={< Radio onClick = {
                                this.radioklik
                            }
                            color = "primary" required />}
                                label="Shopee"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="tokopedia"
                                control={< Radio onClick = {
                                this.radioklik
                            }
                            color = "primary" required />}
                                label="Tokopedia"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="bukalapak"
                                control={< Radio onClick = {
                                this.radioklik
                            }
                            color = "primary" required />}
                                label="Bukalapak"
                                labelPlacement="top"/>
                            <FormControlLabel
                                value="lainnya"
                                control={< Radio onClick = {
                                this.radioklik
                            }
                            color = "primary" required />}
                                label="Lainnya"
                                labelPlacement="top"/>
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <div>.</div>
                    <FormControl>
                        <Button
                            onClick={this.submitBarangKeluar}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={this.state.proses}
                            startIcon={< SaveIcon />}>
                            Submit
                        </Button>
                        {this.state.proses && <CircularProgress size={24}/>}
                    </FormControl>
                {/* </form> */}

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
                <div style={{display: "none"}}>
                    <ComponentToPrint ref={(el) => (this.componentRef = el)} nobarang={this.state.nobarang}/>
                </div>
            </div>
        );
    }
}

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ukuran: localStorage.getItem('ukuranqrcode') || 128,
            jumlahqrcode: localStorage.getItem('jumlahqrcode') || 20,
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
                    {this
                        .state
                        .jumlahx
                        .map((key, i) => (
                            <span
                                style={{marginTop: 10,padding: 10}}
                                key={i}><QRCode
                                bgColor={'#FFFFFF'}
                                fgColor={'#000000'}
                                size={this.state.ukuran}
                                value={this.props.nobarang}/>
                            </span>
                        ))
                    }
                </div>
            </div>
        );
    }
}