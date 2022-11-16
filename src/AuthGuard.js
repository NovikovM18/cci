import { Navigate } from 'react-router-dom';
import { AppState } from './AppContext';
import Loader from './components/Loader';

const AuthGuard = ({children}) => {
  const { user, loading } = AppState();

  if (loading) {
    return <Loader />
  } else if (!user) {
    return <Navigate to='/login' />
  }

  return children;
}

export {AuthGuard}