import { LocalizationProvider } from '@mui/x-date-pickers';
import AuthProvider from "./providers/authProvider";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/es';

import RoutesComponent from './pages/Routes';
import './App.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
