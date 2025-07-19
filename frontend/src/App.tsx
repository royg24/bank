import {Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Logo from './components/Logo';
import Footer from './components/Footer.tsx';
import Toast from './components/Toast.tsx';
import LandingPage from './components/LandingPage';
import AccessForm from './components/AccessForm.tsx';
import Dashboard from './components/Dashboard';
import Verify from './components/Verify';
import { theme } from './css/Style.tsx';
import './css/style.css';

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
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </ThemeProvider>

      <Footer />
      <Toast />
    </div>
  );
}


export default App;
