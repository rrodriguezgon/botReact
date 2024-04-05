import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    container: {
        marginBottom: '10px',
        marginTop: '10px',
    },
    checkTrue: {
        color: 'green',        
    },
    checkFalse: {
        color: 'red',
    }
});

export default useStyles;
