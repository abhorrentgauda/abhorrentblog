import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { signInPath } from '../paths';

type Props = {
  children: JSX.Element;
};

const RequireAuth: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  return token ? children : <Navigate to={`/${signInPath}`} state={{ from: location }} />;
};

export default RequireAuth;
