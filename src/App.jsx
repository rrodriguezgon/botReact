import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';
import NavbarComponent from './components/Navbar';
import RoutesComponent from './pages/Routes';
import './App.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <NavbarComponent />
      <RoutesComponent />
    </LocalizationProvider>

  );
}

export default App;
