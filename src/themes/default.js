import {createTheme} from '@mui/material/styles';

const primary = '#009688';
const accent = '#94c720';
const warn = '#c70d38';
const defaultText = '#404040';
const tableHeaderText = '#8D8D8D';

const theme = createTheme({
    palette: {
        primary: {main: primary},
        secondary: {main: accent},
        warning: {main: warn},
        text: {
            primary: defaultText
        }
    },
    typography: {
        button: {
            color: defaultText
        },
        h3: {
            fontWeight: '500',
            color: defaultText
        },
        h4: {
            color: defaultText
        },
        h5: {
            fontWeight: '500',
            color: defaultText
        },
        body1: {
            fontSize: "large",
            fontWeight: 'normal',
            color: defaultText
        },
        body2: {
            fontWeight: 'normal',
            color: tableHeaderText
        },
        table: {
            fontSize: '0.9rem',
            fontWeight: 'normal',
            color: defaultText
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: tableHeaderText,
                    fontWeight: "normal"
                }
            }
        }
    }
});

export default theme;