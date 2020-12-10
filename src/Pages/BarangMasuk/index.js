import React from 'react';
import Tabel from './Tabel';
import Forminput from './Form';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active: 'Home',
          isLoaded: false,
          items: [],
          rows:[]
        };
        this.formsubmit = this.formsubmit.bind(this);
    }
    formsubmit(event) {
        event.preventDefault();
        var postData ={
          NamaBarang: event.target.barang.value,
          Jumlah: event.target.jumlah.value,
        };
        
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        axios.post('http://localhost:8088/api/barangmasuk/', postData, axiosConfig)
          .then((response) => {
            // this.setState({name: "RESPONSE TEXT"});
            //this.setState({name: response.data.name});
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
            this.setState({rows: [temp, ...this.state.rows]});
            console.log(this.state.rows);
          })
          .catch(function (error) {
            console.log(error);
            alert('error jul.');
          });
    }
    componentDidMount() {
        fetch('http://localhost:8088/api/barangmasuk')
        .then((response) => response.json())
        .then((data) => {
                            this.setState({rows:data});
                        });
    }
    render() {  
      return(
        <div>
            <Forminput formsubmit={this.formsubmit}/>
            <Tabel rows={this.state.rows}/>
        </div>
      )
    }
}