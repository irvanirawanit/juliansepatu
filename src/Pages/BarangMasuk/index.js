import React from 'react';
import Tabel from './Tabel';
import Forminput from './Form';
import axios from 'axios';
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Home',
            isLoaded: false,
            proses:false,
            radiovalue:'',
            jumlahvalue:'',
            items: [],
            rows: []
        };
        this.formsubmit = this.formsubmit.bind(this);
        this.radioklik = this.radioklik.bind(this);
    }
    radioklik(event) {
      this.setState({radiovalue:event.target.value});
    }
    formsubmit(event) {
      this.setState({proses:true});
        event.preventDefault();
        var postData = {
            NamaBarang: event.target.barang.value,
            Jumlah: event.target.jumlah.value
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        };
        // https://juliansepatu99.herokuapp.com
        // http://localhost:3001
        axios
            .get(
                'http://localhost:3001/api/barangmasuk/create?NamaBarang=' +
                        event.target.barang.value + '&Jumlah=' + event.target.jumlah.value,
                postData,
                axiosConfig
            )
            .then((response) => {
                // this.setState({name: "RESPONSE TEXT"}); this.setState({name:
                // response.data.name});
                console.log(response.data);
                // this.setState({rows:data});
                var temp = {
                    BarangMasukId: response.data.BarangMasukId,
                    NoBarang: response.data.NoBarang,
                    NamaBarang: response.data.NamaBarang,
                    Jumlah: response.data.Jumlah,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at,
                    deleted_at: response.data.deleted_at,
                    created_by: response.data.created_by,
                    updated_by: response.data.updated_by
                };
                this.setState({
                    rows: [
                        temp, ...this.state.rows
                    ]
                });
                this.setState({proses:false});
                this.setState({radiovalue:''});
            })
            .catch(function (error) {
                console.log(error);
                alert('error jul.');
            });
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/barangmasuk')
            .then(
                (response) => response.json()
            )
            .then((data) => {
                this.setState({rows: data});
            });
    }
    render() {
        return (
            <div>
                <Forminput radioklik={this.radioklik} formsubmit={this.formsubmit} proses={this.state.proses} radiovalue={this.state.radiovalue} />
                <Tabel rows={this.state.rows}/>
            </div>
        )
    }
}