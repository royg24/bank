import { Navigate, Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { textStructure } from '../../css/Style';
import { verifyToken } from '../BackendCalls';

function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const result = await verifyToken(token);
      setIsAuthenticated(result.success);
      setLoading(false);
    };

    checkToken();
  }, [token]);

  if (loading) {
    return <Typography sx={{
        ...textStructure,
        fontSize: '5em'
    }}>Loading...</Typography>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/access" replace />;
}

export default PrivateRoute;
