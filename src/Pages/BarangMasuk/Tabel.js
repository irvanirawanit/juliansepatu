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


export default class Tabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogopen: false,
            nobarang:'not',
            namabarang:'not'
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen = (val,val2) => {
        this.setState({nobarang:val,namabarang:val2});
        this.setState({dialogopen:true});
      };
    
    handleClose = () => {
        this.setState({dialogopen:false});
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
                            <TableCell>Tanggal Masuk</TableCell>
                            <TableCell>Kode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.rows.map((row) => (
                                    <TableRow key={row.BarangMasukId}>
                                        <TableCell>{row.NamaBarang}</TableCell>
                                        <TableCell>{row.Jumlah}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="primary" onClick={this.handleClickOpen.bind(this,row.NoBarang,row.NamaBarang)}>
                                                Code
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={this.state.dialogopen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        <QRCode value={this.state.nobarang} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    <ReactToPrint
                                trigger={() => <a href="#">Print</a>}
                                content={() => this.componentRef}
                                />
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus="autoFocus">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{ display: "none" }}>
                <ComponentToPrint ref={(el) => (this.componentRef = el)} nobarang={this.state.nobarang} namabarang={this.state.namabarang}/>
            </div>
        </Box>
        )
    }
}

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ukuran: localStorage.getItem('ukuranqrcode') || 150,
            jumlahqrcode: localStorage.getItem('jumlahqrcode') || 1,
            jumlahx:[]
        };
    }

    componentDidMount = () => {
        this.listData();
    }

    listData = () => {
        let arr = []
        for(let i = 1; i <= this.state.jumlahqrcode; i++){
            arr.push(i)
        }
        this.setState({jumlahx:arr})
    }

    render() {
      return (
        <div>
            <div style={{marginLeft:10,marginTop:10,padding:10}}>
                {
                    this.state.jumlahx.map((key,i) => (
                        <span key={i}><QRCode bgColor={'#FFFFFF'} fgColor={'#000000'} size={this.state.ukuran} value={this.props.nobarang}/><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.namabarang}</span>
                    ))
                }
                
            </div>
        </div>
      );
    }
  }
  