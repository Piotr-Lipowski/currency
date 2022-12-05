import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import {update as updateSelectedTab} from '../store/reducers/SelectedTabSlice';
import {update as updateConversionData} from '../store/reducers/ConversionDataSlice'

// UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ConversionHistory = () => {
    const dispatch = useDispatch();
    const [conversionHistory, setConversionHistory] = useState(JSON.parse(localStorage.getItem('conversionHistory')) || []);

    useEffect(() => {
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    }, [conversionHistory])

    const handleClickRemove = (index) => {
        setConversionHistory(prevState => {
            const newState = prevState.slice();
            newState.splice(index, 1);
            return newState;
        })
    }

    const handleClickView = (index) => {
        dispatch(updateConversionData(conversionHistory[index]));
        dispatch(updateSelectedTab(0));
    };

    function generateRows() {
        return conversionHistory.map((data, index) => {
            const {date, amount, convertedFrom, convertedTo} = data;
            return (
                <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}, "&:hover": {"td": {opacity: "1"}}}}>
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            {date}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="table">
                            Converted an amount of {amount} from {convertedFrom} to {convertedTo}
                        </Typography>
                    </TableCell>
                    <TableCell align="left" sx={{opacity: "0"}}>
                        <Button startIcon={<RemoveRedEyeIcon/>} onClick={() => handleClickView(index)}
                                color="primary" size="small" sx={{textTransform: "none"}}>
                            View
                        </Button>
                        <Button startIcon={<DeleteForeverIcon/>} onClick={() => handleClickRemove(index)}
                                color="warning" size="small" sx={{textTransform: "none"}}>
                            Delete forever
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Grid container direction="column">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {generateRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default ConversionHistory;