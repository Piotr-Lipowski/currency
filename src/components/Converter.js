import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update as updateConversionData} from '../store/reducers/ConversionDataSlice'
import saveHistory from "../utils/saveHistory";

// UI
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Converter = () => {
    const dispatch = useDispatch();
    const conversionData = useSelector((state) => state.conversionData.value);
    const convertedTo = conversionData.to;
    const convertedFrom  = conversionData.from;

    const [allRates, setAllRates] = useState({USD: 0, EUR: 0})
    const [to, setTo] = useState(conversionData.to || getLocalState('to') || 'USD');
    const [from, setFrom] = useState(conversionData.from || getLocalState('from') || 'EUR');
    const [rate, setRate] = useState(getLocalState('rate') || 0);
    const [reverseRate, setReverseRate] = useState(getLocalState('reverseRate') || 0);
    const [amount, setAmount] = useState(conversionData.amount || getLocalState('amount') || 500);
    const [displayedAmount, setDisplayedAmount] = useState(conversionData.displayedAmount || getLocalState('amount') || 0);
    const [convertedAmount, setConvertedAmount] = useState(conversionData.convertedAmount || getLocalState('convertedAmount') || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function getLocalState(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    useEffect(() => { // mounted...
        const requestURL = 'https://api.exchangerate.host/latest';

        fetch(requestURL).then(async (res) => {
            const data = await res.json()
            setAllRates(data.rates);
        })
        handleConvert();
    }, [])

    function handleError() {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 1500)
    }

    function handleConvert(event) {
        if(amount <= 0) handleError()

        const requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=3`;
        const requestURLReverse = `https://api.exchangerate.host/convert?from=${to}&to=${from}&amount=${amount}&places=3`;
        setLoading(true);

        fetch(requestURL).then(async (res) => {
            let converted = await res.json();
            setAmount(amount);

            if (converted.result) {
                setRate(converted.info.rate);
                setConvertedAmount(converted.result);
                setDisplayedAmount(amount * 1);
                dispatch(updateConversionData({
                    to,
                    from,
                    amount,
                    convertedAmount: converted.result,
                    displayedAmount: amount * 1
                }));
                event && saveHistory(rate, amount, convertedTo, convertedFrom, convertedAmount, reverseRate);
            } else handleError();

            setLoading(false);
        }).catch(console.error);

        fetch(requestURLReverse).then(async (res) => {
            let convertedReverse = await res.json();
            setReverseRate(convertedReverse.info.rate);
        }).catch(console.error);
    }

    function handleAmount(event) {
        setAmount(event.target.value)
    }

    function handleFrom(event) {
        setFrom(event.target.value);
    }

    function handleTo(event) {
        setTo(event.target.value);
    }

    function handleSwap() {
        const tempFrom = from;
        setFrom(to);
        setTo(tempFrom);
    }

    function getMenuItems() {
        return Object.keys(allRates).map((key) => {
            return (
                <MenuItem key={key} value={key}>
                    {key}
                </MenuItem>
            )
        })
    }

    return (
        <Grid container direction="column" spacing={1} justifyContent="space-evenly"
              sx={{height: '25rem'}}>
            <Grid item justifyContent="space-evenly" alignItems="center">
                <Typography variant="h3">
                    I want to convert
                </Typography>
            </Grid>
            <Grid container spacing={1} direction="row" justifyContent="center" alignItems="flex-end">
                <Grid item>
                    <TextField label="Amount" value={amount} type="number" onChange={handleAmount} size="small"/>
                </Grid>
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel id="from-label">From</InputLabel>
                        <Select
                            labelId="from-label"
                            id="from-select"
                            value={from}
                            label="From"
                            onChange={handleFrom}
                            size="small"
                        >
                            {getMenuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" children={<SwapHorizIcon/>} onClick={handleSwap}/>
                </Grid>
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel id="to-label">To</InputLabel>
                        <Select
                            labelId="to-label"
                            id="to-select"
                            value={to}
                            label="To"
                            onChange={handleTo}
                            size="small"
                        >
                            {getMenuItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <LoadingButton loading={loading} variant="contained"
                                   color={error ? "error" : undefined}
                                   onClick={handleConvert}>
                        {error ? "Error..." : "CONVERT"}
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid container direction="column" alignItems="center">
                <Grid container direction="row" justifyContent="center" spacing={1}>
                    <Grid item xs={5}>
                        <Typography variant="h4" align="right">
                            {displayedAmount} {convertedFrom}
                        </Typography>
                    </Grid>
                    <Grid item xs={0}>
                        <Typography variant="h4" align="center">
                            =
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h4" color="secondary" fontWeight="500">
                            {convertedAmount} {convertedTo}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        1 {convertedFrom} = {rate} {convertedTo}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        1 {convertedTo} = {reverseRate} {convertedFrom}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Converter;