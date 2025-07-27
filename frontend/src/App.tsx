import {Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Logo from './components/General/Logo';
import Footer from './components/General/Footer';
import Toast from './components/General/Toast';
import LandingPage from './components/General/LandingPage';
import AccessForm from './components/Access/AccessForm';
import Dashboard from './components/Dashboard/Dashboard';
import Verify from './components/Verify/Verify';
import { theme } from './css/Style.tsx';
import './css/style.css';
import PrivateRoute from './components/General/PrivateRoute.tsx';

function App() {
  return (
    <div className="app-container">
      {/* Background spheres */}
      <div className="background-spheres">
        <div className="sphere" />
        <div className="black-sphere" />
      </div>

      <ThemeProvider theme={theme}>
        <Logo />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/access' element={<AccessForm />} />
          <Route path='/verify' element={<Verify />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>

      <Footer />
      <Toast />
    </div>
  );
}


export default App;
