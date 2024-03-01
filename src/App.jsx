import { LocalizationProvider } from '@mui/x-date-pickers';
import AuthProvider from "./providers/authProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';

import RoutesComponent from './pages/Routes';
import './App.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
