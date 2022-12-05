import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {DialogContent} from "@mui/material";

function SimpleDialog({ onClose, data, open }) {
    const {date, rate, amount, convertedTo, convertedFrom, convertedAmount} = data;
  return (
    <Dialog onClose={onClose} open={open}>
        <DialogTitle textAlign="center">{date}</DialogTitle>
        <DialogContent dividers>
            <Grid container direction="row" spacing={1}>
                <Grid item>
                    <Typography variant="h4">
                        {amount} {convertedFrom} =
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{color: "#94c720", fontWeight: "500"}}>
                        {convertedAmount} {convertedTo}
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2" align="center">
              1 {convertedFrom} = {rate} {convertedTo}
            </Typography>
        </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;