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

const useStyles = makeStyles({
    table: {
        minWidth: 350
    }
});

export default function DenseTable(props) {
    const classes = useStyles();
    return (
        <Box component="span" m={1}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Kode</TableCell>
                            <TableCell>Tanggal Masuk</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                                    <TableRow key={row.BarangMasukId}>
                                        <TableCell>{row.NamaBarang}</TableCell>
                                        <TableCell>{row.Jumlah}</TableCell>
                                        <TableCell>{row.NoBarang}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
