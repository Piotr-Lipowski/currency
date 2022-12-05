import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from './themes/default'
import Nav from './components/Nav';
import ConversionHistory from "./components/ConversionHistory";
import Converter from "./components/Converter";
import ExchangeHistory from "./components/ExchangeHistory";
import { useSelector } from "react-redux";

const App = () => {

const selectedTab = useSelector((state) => state.selectedTab.value)

    return (
        <ThemeProvider theme={defaultTheme}>
          <Nav />
            <div className="content-wrapper">
            {selectedTab ?
                <ConversionHistory /> :
                <>
                    <Converter/>
                    <ExchangeHistory/>
                </>}
            </div>
        </ThemeProvider>
    );
};

export default App;