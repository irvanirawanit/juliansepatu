import React from 'react';
import QrReader from 'react-qr-reader'
import Tabel from './Tabel';
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
    }
    componentDidMount() {
        fetch('https://juliansepatu99.herokuapp.com/api/barangkeluar').then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({rows: data});
        });
    }
    handleScan = data => {
        if (data) {
          this.setState({dialogopendualoading:true,playStatus: Sound.status.PLAYING,dialogopendua:true})
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
    render() {
        return (
            <div>
                <Sound
                  url="https://juliansepatu.herokuapp.com/juliansepatu/suarabeep.wav"
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
                <Tabel dialogopendualoading={this.state.dialogopendualoading} rows={this.state.rows} detailbarang={this.state.detailbarang} dialogopendua={this.state.dialogopendua} handleClosedialogopendua={this.handleClosedialogopendua}/>
            </div>
        )
    }
}