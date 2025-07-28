import { Outlet } from 'react-router-dom';
import Logo from '../components/General/Logo';
import Footer from '../components/General/Footer';
import Toast from '../components/General/Toast';

function MainLayout() {
  return (
    <div className="app-container">
      <div className="background-spheres">
        <div className="sphere" />
        <div className="black-sphere" />
      </div>

      <Logo />
      <Outlet />
      <Footer />
      <Toast />
    </div>
  );
}

export default MainLayout;
