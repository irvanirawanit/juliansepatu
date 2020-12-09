import React from 'react';
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
          rows:[]
        };
    }
    componentDidMount() {
      const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => console.log('This is your data', data));
    }
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    generateData(){
        this.setState({
            rows:[
                this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
                this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
                this.createData('Eclair', 262, 16.0, 24, 6.0),
                this.createData('Cupcake', 305, 3.7, 67, 4.3),
                this.createData('Gingerbread', 356, 16.0, 49, 3.9),
            ]
        })
    }
    render() { 
      return(
        <div>

        </div>
      )
    }
}