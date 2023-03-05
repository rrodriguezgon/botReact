import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({    
    boxPrincipal: {
        textAlign: "center",
    },
    boxBtnNumeros: {
        textAlign: "center",
        paddingTop: '33px',
    },
    boxMarginBotTop: {
        marginBottom: "10px",
        marginTop: "10px",
    },
    checkTrue: {
        color: 'green',         
    },
    checkFalse: {
        color: 'red',
    },
    row: {
        marginBottom:'10px;',
    }
});

export default useStyles;
