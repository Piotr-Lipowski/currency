import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {update as updateSelectedTab} from '../store/reducers/SelectedTabSlice';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Nav = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state) => state.selectedTab.value);

    function handleTabChange(event, newValue) {
        dispatch(updateSelectedTab(newValue));
    }

    return (
        <Box sx={{ borderBottom: 2, borderColor: 'divider', backgroundColor: 'white' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} centered>
              <Tab label="CURRENCY CONVERTER" />
              <Tab label="VIEW CONVERSION HISTORY" />
            </Tabs>
        </Box>
    );
};

export default Nav;