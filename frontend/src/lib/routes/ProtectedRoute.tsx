import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import FullScreenLoader from '../../components/ui/loaders/FullScreenLoader';

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <FullScreenLoader />;
    }

    const isValid =
        user?.username &&
        user?.phone &&
        user?.id &&
        user.username !== 'na' &&
        user.phone !== 'na';

    return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;