import React from 'react';
import QrReader from 'react-qr-reader'
import Tabel from './Tabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          active: 'Home',
          isLoaded: false,
          items: [],
          rows:[],
          detailbarang:[],
          result: 'No result'
        };
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/barangkeluar')
            .then(
                (response) => response.json()
            )
            .then((data) => {
              console.log(data);
                this.setState({rows: data});
            });
    }
    handleScan = data => {
      if (data) {
        fetch('http://localhost:3001/api/barangmasuk/'+data)
            .then(
                (response) => response.json()
            )
            .then((dataapi) => {
              console.log(dataapi);
                this.setState({detailbarang: dataapi});
            });
        this.setState({
          result: data
        })
      }
    }
    handleError = err => {
      console.error(err)
    }
    render() { 
      return(
        <div>
          <h2>Barang Keluar</h2>
          <QrReader
            facingMode="environment"
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '30%' }}
          />
          <p>{this.state.result}</p>
          <Tabel rows={this.state.rows} detailbarang={this.state.detailbarang}/>
        </div>
      )
    }
}