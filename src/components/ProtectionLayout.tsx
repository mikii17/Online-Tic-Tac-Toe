import { Outlet, Navigate } from 'react-router-dom';
import { UserContext, useUser } from '../App';

export default function ProtectionLayout() {
    const user = useUser();
    if (!user.username) {
        return <Navigate to="/" />;
    }
  return <Outlet />;
}