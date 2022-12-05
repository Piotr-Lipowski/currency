import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import getFormattedDate from "../utils/getFormattedDate";

// UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ExchangeHistory = () => {
    const [days, setDays] = useState(7)
    const endDate = getFormattedDate();
    const [startDate, setStartDate] = useState(getFormattedDate(days));
    const [exchangeData, setExchangeData] = useState({});

    const conversionData = useSelector((state) => state.conversionData.value);
    const {from, to} = conversionData;

    useEffect(() => {
        const requestURL = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${from}`;

        fetch(requestURL).then(async (res) => {
            const data = await res.json()
            setExchangeData(data.rates);
        })

    }, [days, from, to])

    function handleDays(event) {
        setDays(event.target.value);
        setStartDate(getFormattedDate(event.target.value));
    }

    function generateExchangeHistory() {
        return Object.keys(exchangeData).map((key) => {
            if (!exchangeData[key][to]) return;
            return (
                <TableRow key={key} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            {key}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="table">
                            {exchangeData[key][to]}
                        </Typography>
                    </TableCell>
                </TableRow>
            )
        })
    }

    function generateStats() {
        let rates = [];

        Object.keys(exchangeData).map((key) => {
            if (!exchangeData[key][to]) return;
            rates.push(exchangeData[key][to]);
        })

        let low = rates[0] ? Math.min(...rates) : 0;
        let high = rates[0] ? Math.max(...rates) : 0;
        let average = rates[0] ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;

        return (
            <>
                <TableRow
                    key="low"
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            Lowest
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            {low}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow
                    key="high"
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            Highest
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            {high}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow
                    key="average"
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            Average
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography variant="table">
                            {average.toPrecision(6)}
                        </Typography>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    return (
        <Grid container direction="column" spacing={1}
              sx={{borderTop: 2, borderColor: 'divider'}}>
            <Grid item p="1rem">
                <Typography variant="h5">
                    Exchange History
                </Typography>
            </Grid>
            <Grid item sx={{width: "10rem"}} p="1rem">
                <FormControl fullWidth>
                    <InputLabel id="duration-label">Duration</InputLabel>
                    <Select
                        labelId="duration-label"
                        id="duration-select"
                        value={days}
                        label="Duration"
                        onChange={handleDays}
                        size="small"
                    >
                        <MenuItem key={7} value={7}>
                            7 days
                        </MenuItem>
                        <MenuItem key={14} value={14}>
                            14 days
                        </MenuItem>
                        <MenuItem key={31} value={31}>
                            31 days
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="left">Exchange rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generateExchangeHistory()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Statistics</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generateStats()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ExchangeHistory;