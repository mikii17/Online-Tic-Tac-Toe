import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function ProtectionLayout() {
    const user = useContext(UserContext);
    if (!user.username) {
        return <Navigate to="/" />;
    }
  return <Outlet />;
}