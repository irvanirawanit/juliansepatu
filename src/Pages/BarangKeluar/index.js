import React from 'react';
import QrReader from 'react-qr-reader'
import Tabel from './Tabel';
import axios from 'axios';
// import {makeStyles} from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Sound from 'react-sound';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            detailbarang: [],
            dialogopendua: false,
            dialogopendualoading: false,
            playStatus: Sound.status.STOPPED,
        };
        this.handleClosedialogopendua = this.handleClosedialogopendua.bind(this);
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
        this.submitBarangKeluar = this.submitBarangKeluar.bind(this);
    }
    componentDidMount() {
        fetch('https://juliansepatu99.herokuapp.com/api/barangkeluar').then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({rows: data});
        });
    }
    handleScan = data => {
        if (data) {
          this.setState({dialogopendualoading:true,playStatus: Sound.status.PLAYING,dialogopendua:true});
            fetch('https://juliansepatu99.herokuapp.com/api/barangmasuk/' + data).then((response) => response.json()).then((dataapi) => {
                this.setState({detailbarang: dataapi,dialogopendualoading:false});
            });
        }
    }
    handleError = err => {
        console.error(err)
    }
    handleClosedialogopendua() {
      this.setState({dialogopendua:false});
    }
    handleSongFinishedPlaying() {
      this.setState({playStatus: Sound.status.STOPPED});
    }
    submitBarangKeluar(val) {
      axios.get('https://juliansepatu99.herokuapp.com/api/barangkeluar/create?BarangMasukId=' + this.state.detailbarang.BarangMasukId + '&toko=' + val + '&Jumlah=' + 1)
            .then((response) => {
                // var temp = {
                //   BarangKeluarId: response.data.BarangKeluarId,
                //     NoBarang: response.data.NoBarang,
                //     Jumlah: response.data.Jumlah,
                //     BarangMasukId: response.data.BarangMasukId,
                //     created_at: response.data.created_at,
                //     updated_at: response.data.updated_at,
                //     deleted_at: response.data.deleted_at,
                //     created_by: response.data.created_by,
                //     updated_by: response.data.updated_by,
                //     toko: response.data.toko,
                //     toko: response.data.toko
                // };
                this.setState({ rows: [response.data, ...this.state.rows] });
                this.setState({dialogopendua: false});
                console.log(this.state.rows);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert('error jul.');
            });
    }
    render() {
        return (
            <div>
                <Sound
                  url="http://juliansepatu.herokuapp.com/juliansepatu/suarabeep.wav"
                  playStatus={this.state.playStatus}
                  playFromPosition={3 /* in milliseconds */}
                  onLoading={this.handleSongLoading}
                  onPlaying={this.handleSongPlaying}
                  onFinishedPlaying={this.handleSongFinishedPlaying}
                />
                <h2>Barang Keluar</h2>
                <QrReader
                    facingMode="environment"
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{
                    width: '30%'
                }}/>
                <Tabel submitBarangKeluar={this.submitBarangKeluar} dialogopendualoading={this.state.dialogopendualoading} rows={this.state.rows} detailbarang={this.state.detailbarang} dialogopendua={this.state.dialogopendua} handleClosedialogopendua={this.handleClosedialogopendua}/>
            </div>
        )
    }
}