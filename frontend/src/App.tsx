import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import LandingPage from './components/General/LandingPage';
import AccessForm from './components/Access/AccessForm';
import Dashboard from './components/Dashboard/Dashboard';
import Verify from './components/Verify/Verify';
import VideoScreen from './components/Dashboard/VideoScreen';
import PrivateRoute from './components/General/PrivateRoute';
import { theme } from './css/Style';
import MainLayout from './Layouts/MainLayout';
import BareLayout from './Layouts/BareLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/access" element={<AccessForm />} />
          <Route path="/verify" element={<Verify />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<BareLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/video" element={<VideoScreen />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
